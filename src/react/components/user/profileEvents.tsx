import React, {useEffect, useState} from 'react';
import {readEventsByUser} from "../../api/event.api";
import {User} from "../../models/user.model";
import {Event} from '../../models/event.model';
import Placeholder from '../../../assets/img/placeholder_item.png';
import {getDateTimeString} from "../../util/common";
import {CircularProgress} from "@material-ui/core";
import {useHistory} from 'react-router-dom';

interface ProfileEventsProps {
    user: User;
}

export const ProfileEvents = (props: ProfileEventsProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [events, setEvents] = useState<Event[]>([]);
    const [error, setError] = useState<string>('');
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            readEventsByUser(props.user).then((events: Event[]) => {
                setEvents(events);
            }).catch((error) => {
                setError(error);
            }).finally(() => {
                setLoading(false);
            });
        }, 500);
    }, [props.user]);

    return (
        <section className="profile-events elevation-4">
            {loading ? <div className="loading"><CircularProgress/></div> : ''}
            {!loading && events.length == 0 ? <p className="no-events">This user is not hosting any events.</p> : ''}
            {events.map((e, i) =>
                <Event key={i} user={props.user} event={e}/>
            )}
        </section>
    )
};

interface EventProps {
    user: User;
    event: Event;
}

const Event = (props: EventProps) => {
    const history = useHistory();
    const clickEvent = () => {
        history.push(`/event/${props.event.id}/`);
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