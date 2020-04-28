import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";
import placeholder from "../../../assets/img/placeholder_person.jpg";
import {getDateTimeString} from "../../util/common";
import {readAllEvents, readEventsByFollowers} from "../../api/event.api";
import {readUserByEvent, readUserFollowerCount} from "../../api/user.api";
import {Event} from "../../models/event.model";
import {User} from "../../models/user.model";

export const BrowseEvents = () => {
    return <main>
        <header className="sub-menu">
            <div className="actions">
                <div className="back-action">

                </div>
                <h3 className="title">Browse Events</h3>
                <div className="forward-action">

                </div>
            </div>
        </header>
        <Events/>
    </main>
};


const Events = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        setLoading(true);
        readEventsByFollowers().then(async (events: Event[]) => {
            if (events.length == 0) {
                await readAllEvents().then((events: Event[]) => {
                    setEvents(events);
                });
            } else {
                setEvents(events);
            }
        }).catch(async () => {
            await readAllEvents().then((events: Event[]) => {
                setEvents(events);
            });
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className="loading">
            <CircularProgress/>
        </div>
    } else {
        return <section className="browse-events">
            {events.map((e, i) => (<EventListing key={i} event={e}/>))}
        </section>
    }
};

interface EventListingProps {
    event: Event;
}

const EventListing = (props: EventListingProps) => {
    const history = useHistory();
    const [user, setUser] = useState<User>(undefined);
    const [count, setCount] = useState<number>(-1);
    useEffect(() => {
        readUserByEvent(props.event).then((user: User) => {
            readUserFollowerCount(user).then((count: number) => {
                setCount(count);
            });
            setUser(user);
        });
    }, []);

    if (user != undefined && count >= 0) {
        return <article className="paper elevation-3 event-listing"
                        onClick={() => history.push(`/event/view/${props.event.id}`)}>
            <h5>{getDateTimeString(props.event.dateStart)}</h5>
            <h1>{props.event.title}</h1>
            <div className="member">
                <div className="image">
                    <img src={placeholder} alt="profile_image"/>
                </div>
                <div className="details">
                    <h3>{user.username}</h3>
                    <span>{count} Followers</span>
                </div>
            </div>
        </article>
    } else {
        return <div/>
    }
};