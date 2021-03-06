import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {User} from "../../models/user.model";
import {useSelector} from "react-redux";
import {CircularProgress} from "@material-ui/core";
import {readAttendingByUser, readEventsByUser} from "../../api/event.api";
import {Event} from "../../models/event.model";
import Placeholder from "../../../assets/img/placeholder_item.png";
import moment from "moment";

export const Events = () => {
    const user: User = useSelector((state: any) => state.auth.currentUser);
    const [page, setPage] = useState(0);
    return <main>
        <header className="sub-menu">
            <div className="actions">
                <div className="back-action">
                    <Link to={`/profile/${user.username}`}>{"< Back"}</Link>
                </div>
                <h3 className="title">Events</h3>
                <div className="forward-action">
                    <Link to={`/event/create`}>{"Create"}</Link>
                </div>
            </div>
            <div className="tabs">
                <div className={`tab ${page == 0 ? "selected" : ""}`} onClick={() => setPage(0)}>
                    Hosting
                </div>
                <div className={`tab ${page == 1 ? "selected" : ""}`} onClick={() => setPage(1)}>
                    Attending
                </div>
            </div>
        </header>
        <section className="events">
            <EventsBody page={page} user={user}/>
        </section>
    </main>
};

interface EventsBodyProps {
    page: number;
    user: User;
}

const EventsBody = (props: EventsBodyProps) => {
    if (props.page == 0) {
        return <HostingEvents user={props.user}/>
    } else {
        return <AttendingEvents user={props.user}/>
    }
};

interface EventsProps {
    user: User;
}

const HostingEvents = (props: EventsProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [events, setEvents] = useState<Event[]>([]);
    useEffect(() => {
        const interval = setTimeout(() => {
            readEventsByUser(props.user).then((events: Event[]) => {
                setEvents(events);
            }).finally(() => {
                setLoading(false);
            });
        }, 500);
        return () => clearInterval(interval);
    }, []);
    if (loading) {
        return <div className="loading">
            <CircularProgress/>
        </div>
    } else if (events.length == 0) {
        return <div>
            You are not hosting any events!
        </div>
    } else {
        return <div className="events">
            {events.map((e, i) =>
                <Event key={i} user={props.user} event={e}/>
            )}
        </div>
    }
};

const AttendingEvents = (props: EventsProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [events, setEvents] = useState<Event[]>([]);
    useEffect(() => {
        const interval = setTimeout(() => {
            readAttendingByUser(props.user).then((events: Event[]) => {
                setEvents(events);
            }).finally(() => {
                setLoading(false);
            });
        }, 500);
        return () => clearInterval(interval);
    }, []);
    if (loading) {
        return <div className="loading">
            <CircularProgress/>
        </div>
    } else if (events.length == 0) {
        return <div>
            You are not attending any events!
        </div>
    } else {
        return <div className="events">
            {events.map((e, i) =>
                <Event key={i} user={props.user} event={e}/>
            )}
        </div>
    }
};

interface EventProps {
    user: User;
    event: Event;
}

const Event = (props: EventProps) => {
    const history = useHistory();
    const clickEvent = () => {
        history.push(`/event/view/${props.event.id}/`);
    };

    return (
        <div className="event" onClick={clickEvent}>
            <div className="image">
                <img src={Placeholder} alt=""/>
            </div>
            <div className="details">
                <h3>{props.event.title}</h3>
                <h4>{props.user.username}</h4>
                {moment(props.event.dateStart).isAfter(moment()) ?
                    <div>
                        <h4>Event Not Started</h4>
                        <h5>Starts {moment.utc(props.event.dateStart).startOf("minute").fromNow()}</h5>
                    </div> :
                    <div>
                        <h4>Event Completed</h4>
                        <h5>Posted {moment.utc(props.event.datePosted).endOf("day").fromNow()}</h5>
                    </div>
                }
            </div>
        </div>
    )
};