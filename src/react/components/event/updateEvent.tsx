import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";
import {Event} from "../../models/event.model";
import {readEventById, updateEventRecord} from "../../api/event.api";
import {ErrorPage} from "../error/error";
import {SearchPlace} from "./searchPlace";
import {getDateTimeLocalString} from "../../util/common";
import {DeleteEvent} from "./deleteEvent";
import moment from "moment";

export const UpdateEvent = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [event, setEvent] = useState<Event>(undefined);
    useEffect(() => {
        setLoading(true);
        const interval = setTimeout(() => {
            const eventId: number = Number.parseInt(id);
            if (id && eventId != undefined && eventId >= 0) {
                // get event from database
                readEventById(eventId).then((event: Event) => {
                    setEvent(event);
                }).finally(() => {
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        }, 333);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div className="loading">
            <CircularProgress/>
        </div>
    } else if (event != undefined) {
        return <UpdateForm event={event} setEvent={setEvent}/>
    } else {
        return <ErrorPage/>
    }
};

interface UpdateFormProps {
    event: Event;
    setEvent: any;
}

export const UpdateForm = (props: UpdateFormProps) => {
    const history = useHistory();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [deleting, setDeleting] = useState(false);

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        try {
            e.persist();
            if (e.target.name == "dateStart") {
                props.setEvent({
                    ...props.event,
                    [e.target.name]: new Date(e.target.value)
                });
            } else {
                props.setEvent({
                    ...props.event,
                    [e.target.name]: e.target.value
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
        }
        putEvent();
    };
    const putEvent = () => {
        // clear error
        setError("");
        // lock controls
        setLoading(true);
        // convert date from local to utc
        props.event.dateStart = moment(props.event.dateStart).toDate();
        // send event object to server
        updateEventRecord(props.event).then((message: string) => {
            // redirect to update event
            history.push(`/event/view/${props.event.id}`);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    };
    const clickDelete = () => {
        setDeleting(!deleting);
    };

    return <main className="update-event">
        {deleting ? <DeleteEvent event={props.event} setDeleting={setDeleting}/> : ""}
        <header className="sub-menu">
            <div className="actions">
                <div className="back-action">
                    <Link to={`/event/view/${props.event.id}`}>{"< Back"}</Link>
                </div>
                <h3 className="title">Edit Event</h3>
                <div className="forward-action">
                    <a onClick={() => clickDelete()}>{"Delete"}</a>
                </div>
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
                           defaultValue={props.event.title}
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
                        defaultValue={props.event.description}
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
                           defaultValue={getDateTimeLocalString(props.event.dateStart)}
                           onChange={onChange}
                           required
                    />
                </label>
                <label htmlFor="">Event Location</label>
                <SearchPlace event={props.event} setEvent={props.setEvent}/>
                <label htmlFor="address_name">
                    Location Name
                    <input type="text"
                           id="address_name"
                           name="address_name"
                           placeholder="Location name (e.g. Central Park)"
                           defaultValue={props.event.address_name}
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
                           defaultValue={props.event.address_location}
                           onChange={onChange}
                           required
                    />
                </label>
                {!loading ? <button type="submit">Update event</button> :
                    <button type="button"><CircularProgress size={18}/></button>}
                {error ? <p className="error">{error}</p> : ""}
            </form>
        </section>
    </main>;
};