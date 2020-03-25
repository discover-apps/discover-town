import React, {useEffect, useState} from 'react';
import {Event} from '../../models/event.model';
import ClockIcon from "@material-ui/icons/AccessTime";
import LocationIcon from "@material-ui/icons/LocationOn";
import GoogleMapReact from "google-map-react";
import {getDateTimeString, getTimeString} from "../../util/common";
import {useParams} from "react-router-dom";
import {
    createEventAttendee,
    deleteEventAttendee,
    readEventAttendees,
    readEventById,
    userAttendingEvent
} from "../../api/event.api";
import marker from '../../../assets/img/marker.png';
import placeholder1 from "../../../assets/img/placeholder_item.png";
import placeholder2 from "../../../assets/img/placeholder_person.jpg";
import {readUserByEvent, readUserFollowerCount} from "../../api/user.api";
import {User} from "../../models/user.model";
import {CircularProgress} from "@material-ui/core";
import {useSelector} from "react-redux";

export const ViewEvent = () => {
    const [event, setEvent] = useState(undefined);
    const [user, setUser] = useState(undefined);
    const [followers, setFollowers] = useState<number>(0);
    // get id from url params
    let {id} = useParams();
    useEffect(() => {
        // get event object from server
        readEventById(Number.parseInt(id)).then((event: Event) => {
            setEvent(event);
            // get user object from server
            readUserByEvent(event).then((user: User) => {
                setUser(user);
                // get follower count for user from server
                readUserFollowerCount(user).then((count: number) => {
                    setFollowers(count);
                });
            });
        });
    }, []);

    if (event != undefined && user != undefined) {
        return <main className="event">
            <EventTitle user={user} event={event} followerCount={followers}/>
            <EventInformation user={user} event={event} followerCount={followers}/>
            <EventDetails user={user} event={event} followerCount={followers}/>
            <EventAttendees user={user} event={event} followerCount={followers}/>
        </main>;
    } else {
        return <div className="loading">
            <CircularProgress/>
        </div>;
    }
};

interface EventProps {
    user: User;
    event: Event;
    followerCount: number;
}

const EventTitle = (props: EventProps) => {

    return (
        <section className="paper elevation-3 title">
            <h5 className="">{getDateTimeString(props.event.dateStart)}</h5>
            <h1>{props.event.title}</h1>
            <div className="member-attend">
                <div className="member">
                    <div className="image">
                        <img src={placeholder2} alt="profile_image"/>
                    </div>
                    <div className="details">
                        <h3>{props.user.username}</h3>
                        <span>{props.followerCount} Followers</span>
                    </div>
                </div>
                <div className="button">
                    <EventButton user={props.user} event={props.event} followerCount={props.followerCount}/>
                </div>
            </div>
        </section>
    )
};

const EventButton = (props: EventProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [sameUser, setSameUser] = useState<boolean>(false);
    const [attending, setAttending] = useState<boolean>(false);
    const currentUser = useSelector((state: any) => state.auth.currentUser);
    useEffect(() => {
        if (currentUser && currentUser.id == props.user.id) {
            setSameUser(true);
        } else {
            // check if user is attending current event
            userAttendingEvent(props.event).then((attending: boolean) => {
                setAttending(attending);
            });
        }
    }, [currentUser, attending]);
    const clickAttend = () => {
        setLoading(true);
        createEventAttendee(props.event).then((message: string) => {
            setAttending(true);
        }).finally(() => {
            setLoading(false);
        });
    };
    const clickAttending = () => {
        setLoading(true);
        deleteEventAttendee(props.event).then((message: string) => {
            setAttending(false);
        }).finally(() => {
            setLoading(false);
        });
    };
    if (sameUser) {
        return <button className="outline-button">Edit</button>
    } else if (loading) {
        return <button><CircularProgress size={18} color="primary"/></button>
    } else if (attending) {
        return <button onClick={clickAttending} className="outline-button">Attending</button>
    } else {
        return <button onClick={clickAttend}>Attend</button>;
    }
};

const EventInformation = (props: EventProps) => {
    return (
        <section className="paper elevation-3 information">
            <div className="info">
                <div className="icon">
                    <ClockIcon/>
                </div>
                <div className="text">
                    <p>{getDateTimeString(props.event.dateStart)}{" "}{getTimeString(props.event.dateStart)}</p>
                </div>
            </div>
            <div className="info">
                <div className="icon">
                    <LocationIcon/>
                </div>
                <div className="text">
                    <p>{props.event.address_location}</p>
                </div>
            </div>
            <div className="map">
                <GoogleMaps user={props.user} event={props.event} followerCount={props.followerCount}/>
            </div>
        </section>
    );
};

const GoogleMapsMarker = (props: any) => <div><img className="marker" src={marker} alt="marker"/></div>;

const GoogleMaps = (props: EventProps) => {
    return (
        // Important! Always set the container height explicitly
        <div style={{height: '225px', width: '100%'}}>
            <GoogleMapReact
                yesIWantToUseGoogleMapApiInternals
                bootstrapURLKeys={{key: "AIzaSyCFghWiQ6YR9gvIn572y9yTD49K3igUeiI"}}
                defaultCenter={{lat: props.event.lat, lng: props.event.lon}}
                defaultZoom={15}
            >
                <GoogleMapsMarker
                    position={{
                        lat: props.event.lat,
                        lng: props.event.lon
                    }}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );
};

const EventDetails = (props: EventProps) => {
    return (
        <section className="paper elevation-3 details">
            <div className="image">
                <img src={placeholder1} alt="event_image"/>
            </div>
            <div className="text">
                <h2>Details</h2>
                <p>{props.event.description}</p>
            </div>
        </section>
    )
};

const EventAttendees = (props: EventProps) => {
    const [attendees, setAttendees] = useState<User[]>([]);
    useEffect(() => {
        readEventAttendees(props.event).then((users: User[]) => {
            setAttendees(users);
        });
    }, []);
    return (
        <section>
            <div className="paper elevation-3 attendees-title">
                <h2>Attendees ({attendees.length})</h2>
                <a>See all</a>
            </div>
            <div className="attendees-list">
                {attendees[0] != undefined ? <Attendee user={attendees[0]}/> : ''}
                {attendees[1] != undefined ? <Attendee user={attendees[1]}/> : ''}
            </div>
        </section>
    )
};

interface AttendeeProps {
    user: User;
}

const Attendee = (props: AttendeeProps) => {
    const [followersCount, setFollowerCount] = useState<number>(0);
    useEffect(() => {
        readUserFollowerCount(props.user).then((count: number) => {
            setFollowerCount(count);
        });
    });
    return (
        <div className="attendee paper elevation-3">
            <div className="image">
                <img src={placeholder2} alt="profile_image"/>
            </div>
            <h3>{props.user.username}</h3>
            <h4>{followersCount} Followers</h4>
        </div>
    )
};