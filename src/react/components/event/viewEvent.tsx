import React, {useEffect, useState} from "react";
import moment from "moment";
import ClockIcon from "@material-ui/icons/AccessTime";
import LocationIcon from "@material-ui/icons/LocationOn";
import {CircularProgress} from "@material-ui/core";
import {Event} from "../../models/event.model";
import {useHistory, useParams} from "react-router-dom";
import placeholder1 from "../../../assets/img/placeholder_item.png";
import placeholder2 from "../../../assets/img/placeholder_person.jpg";
import {readUserByEvent, readUserFollowerCount} from "../../api/user.api";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import {User} from "../../models/user.model";
import {useSelector} from "react-redux";
import {
    createEventAttendee,
    deleteEventAttendee,
    readEventAttendees,
    readEventById,
    userAttendingEvent
} from "../../api/event.api";
import {GoogleMaps} from "../maps/googleMap";
import {verifyAdmin} from "../../api/auth.api";

export const ViewEvent = () => {
    const history = useHistory();
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
            <header className="sub-menu">
                <div className="actions">
                    <div className="back-action">
                        <a onClick={() => history.goBack()}>{"< Back"}</a>
                    </div>
                    <h3 className="title">Event</h3>
                    <div className="forward-action">
                        <a>Report</a>
                    </div>
                </div>
            </header>
            <EventAdmin user={user} event={event} followerCount={followers}/>
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

const EventAdmin = (props: EventProps) => {
    const history = useHistory();
    const [reportsNo, setReportsNo] = useState(0);
    const [admin, setAdmin] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        verifyAdmin().then(() => {
            setAdmin(true);
        });
    }, []);

    if (admin) {
        return (
            <section className="paper elevation-3 admin">
                <div className="title">
                    <span>Administration</span>
                    {
                        !visible ?
                            <span onClick={() => setVisible(true)}>
                                <KeyboardArrowDownIcon/>
                            </span>
                            :
                            <span onClick={() => setVisible(false)}>
                                <KeyboardArrowUpIcon/>
                            </span>
                    }
                </div>
                {
                    visible ?
                        <div className="contents">
                            <p>Date created: {moment(props.event.datePosted).format("llll")}</p>
                            <p>Number of reports: {reportsNo}</p>
                            <div className="buttons">
                                <button onClick={() => history.push(`/event/update/${props.event.id}`)}>Edit</button>
                                <button onClick={() => history.push(`/event/view/${props.event.id}/reports`)}>Reports
                                </button>
                            </div>
                        </div>
                        : ""
                }
            </section>
        );
    } else {
        return <div/>;
    }
};

const EventTitle = (props: EventProps) => {
    const history = useHistory();
    const navigateToProfile = () => {
        history.push(`/profile/${props.user.username}`);
    };
    const navigateToUserFollowers = () => {
        history.push(`/profile/${props.user.username}/followers`)
    };
    return (
        <section className="paper elevation-3 title">
            <h5 className="">{moment(props.event.dateStart).format("dddd") + ", " + moment(props.event.dateStart).format("ll")}</h5>
            <h1>{props.event.title}</h1>
            <div className="member-attend">
                <div className="member">
                    <div className="image" onClick={navigateToProfile}>
                        <img src={placeholder2} alt="profile_image"/>
                    </div>
                    <div className="details">
                        <h3 onClick={navigateToProfile}>{props.user.username}</h3>
                        <span onClick={navigateToUserFollowers}>{props.followerCount} Followers</span>
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
    const history = useHistory();
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
    const clickEdit = () => {
        history.push(`/event/update/${props.event.id}`);
    };
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
        return <button onClick={clickEdit} className="outline-button">Edit</button>
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
                    <p>{moment(props.event.dateStart).format("LLLL")}</p>
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
                <GoogleMaps lat={props.event.lat} lon={props.event.lon}/>
            </div>
        </section>
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
    const {id} = useParams();
    const history = useHistory();
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
                <a onClick={() => history.push(`/event/view/${id}/attendees`)}>See all</a>
            </div>
            <div className="attendees-list">
                {attendees[0] != undefined ? <Attendee user={attendees[0]}/> : ""}
                {attendees[1] != undefined ? <Attendee user={attendees[1]}/> : ""}
            </div>
        </section>
    )
};

interface AttendeeProps {
    user: User;
}

const Attendee = (props: AttendeeProps) => {
    const history = useHistory();
    const [followersCount, setFollowerCount] = useState<number>(0);
    useEffect(() => {
        readUserFollowerCount(props.user).then((count: number) => {
            setFollowerCount(count);
        });
    });
    return (
        <div className="attendee paper elevation-3" onClick={() => history.push(`/profile/${props.user.username}`)}>
            <div className="image">
                <img src={placeholder2} alt="profile_image"/>
            </div>
            <h3>{props.user.username}</h3>
            <h4>{followersCount} Followers</h4>
        </div>
    )
};