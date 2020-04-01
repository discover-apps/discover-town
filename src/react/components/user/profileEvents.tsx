import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {CircularProgress} from "@material-ui/core";
import {readEventsByUser} from "../../api/event.api";
import {getDateTimeString} from "../../util/common";
import {User} from "../../models/user.model";
import {Event} from '../../models/event.model';
import Placeholder from '../../../assets/img/placeholder_item.png';

interface ProfileEventsProps {
    user: User;
}
export const ProfileEvents = (props: ProfileEventsProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [events, setEvents] = useState<Event[]>([]);
    useEffect(() => {
        setTimeout(() => {
            readEventsByUser(props.user).then((events: Event[]) => {
                setEvents(events);
            }).finally(() => {
                setLoading(false);
            });
        }, 333);
    }, []);
    if (loading) {
        return <div className="loading">
            <CircularProgress/>
        </div>
    } else if (events.length == 0) {
        return <section className="profile-events elevation-4">
            <div className="events">
                <p className="no-events">This user is not hosting any events.</p>
            </div>
        </section>
    } else {
        return <section className="profile-events elevation-4">
            <div className="events">
                {events.map((e, i) =>
                    <Event key={i} user={props.user} event={e}/>
                )}
            </div>
        </section>
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
                <h5>{getDateTimeString(props.event.dateStart)}</h5>
            </div>
        </div>
    )
};