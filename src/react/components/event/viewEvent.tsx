import React, {useEffect, useState} from 'react';
import {Event} from '../../models/event.model';
import ShareIcon from "@material-ui/icons/Share";
import ClockIcon from "@material-ui/icons/AccessTime";
import LocationIcon from "@material-ui/icons/LocationOn";
import GoogleMapReact from "google-map-react";
import {getDateTimeString, getTimeString} from "../../util/common";
import {useParams} from "react-router-dom";
import {readEventById} from "../../api/event.api";
import marker from '../../../assets/img/marker.png';
import placeholder1 from "../../../assets/img/placeholder_item.png";
import placeholder2 from "../../../assets/img/placeholder_person.jpg";
import {readUserByEvent, readUserFollowerCount} from "../../api/user.api";
import {User} from "../../models/user.model";
import {CircularProgress} from "@material-ui/core";

const event: Event = {
    title: 'Lorem Ipsum',
    description: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br/><br/>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>`,
    address_name: '',
    address_location: '20 W 34th St, New York, NY 10001',
    lat: 40.7498443802915,
    lon: -73.98506271970849,
    dateStart: new Date('March 23, 2020 14:00:00'),
    datePosted: new Date()
};

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
            <EventAttendees/>
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
            <div className="member-share">
                <div className="member">
                    <div className="image">
                        <img src={placeholder2} alt="profile_image"/>
                    </div>
                    <div className="details">
                        <h3>{props.user.username}</h3>
                        <span>{props.followerCount} Followers</span>
                    </div>
                </div>
                <div className="share">
                    <button className="outline-button"><ShareIcon/>Share</button>
                </div>
            </div>
        </section>
    )
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
                    <p>{event.address_location}</p>
                </div>
            </div>
            <div className="map">
                <GoogleMaps user={props.user} event={event} followerCount={props.followerCount}/>
            </div>
        </section>
    );
};

const GoogleMapsMarker = (props: any) => <div><img className="marker" src={marker} alt="marker"/></div>;

const GoogleMaps = (props: EventProps) => {

    const geolocationUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCFghWiQ6YR9gvIn572y9yTD49K3igUeiI";

    const defaultProps = {
        center: {
            lat: props.event.lat,
            lng: props.event.lon
        },
        zoom: 5
    };
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

const EventAttendees = () => {
    return (
        <section>
            <div className="paper elevation-3 attendees-title">
                <h2>Attendees (12)</h2>
                <a>See all</a>
            </div>
            <div className="attendees-list">
                <Attendee/>
                <Attendee/>
            </div>
        </section>
    )
};

const Attendee = () => {
    return (
        <div className="attendee paper elevation-3">
            <div className="image">
                <img src={placeholder2} alt="profile_image"/>
            </div>
            <h3>Jason Efthimiou</h3>
            <h4>100 followers</h4>
        </div>
    )
};