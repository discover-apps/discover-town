import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {CircularProgress} from "@material-ui/core";
import {createEventRecord} from "../../api/event.api";
import {Event} from '../../models/event.model';
import {SearchPlace} from "./searchPlace";

export const CreateEvent = () => {
    const history = useHistory();
    const [error, setError] = useState('');
    const [event, setEvent] = useState<Event>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const postEvent = () => {
        // clear error
        setError('');
        // lock controls
        setLoading(true);
        // send event object to server
        createEventRecord(event).then((event: Event) => {
            history.push(`/event/view/${event.id}`);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    };

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.persist();
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
        }
        postEvent();
    };

    return (
        <main className="create-event">
            <header className="sub-menu">
                <div className="actions">
                    <div className="back-action">
                        <Link to={`/events/`}>{'< Back'}</Link>
                    </div>
                    <h3 className="title">Create Event</h3>
                </div>
            </header>
            <section>
                <form onSubmit={onSubmit}>
                    <label htmlFor="title">
                        Event Title
                        <input type="text"
                               id="title"
                               name="title"
                               placeholder="Event title"
                               defaultValue=""
                               onChange={onChange}
                               required
                        />
                    </label>
                    <label htmlFor="description">
                        Description
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Event description"
                            defaultValue=""
                            onChange={onChange}
                            required
                        />
                    </label>
                    <label htmlFor="dateStart">
                        Event Start
                        <input type="datetime-local"
                               id="dateStart"
                               name="dateStart"
                               placeholder="Search places"
                               defaultValue=""
                               onChange={onChange}
                               required
                        />
                    </label>
                    <label htmlFor="">Event Location</label>
                    <SearchPlace event={event} setEvent={setEvent}/>
                    <label htmlFor="address_name">
                        Location Name
                        <input type="text"
                               id="address_name"
                               name="address_name"
                               placeholder="Location name (e.g. Central Park)"
                               defaultValue=""
                               value={event ? event.address_name : ''}
                               onChange={onChange}
                               required
                        />
                    </label>
                    <label htmlFor="Location Address">
                        Location Address
                        <input type="text"
                               id="address_location"
                               name="address_location"
                               placeholder="Location address"
                               defaultValue=""
                               value={event ? event.address_location : ''}
                               onChange={onChange}
                               required
                        />
                    </label>
                    {!loading ? <button type="submit">Create event</button> :
                        <button type="button"><CircularProgress size={18}/></button>}
                    {error ? <p className="error">{error}</p> : ''}
                </form>
            </section>
        </main>
    )
};