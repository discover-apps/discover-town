import React, {useEffect, useState} from "react";
import {CircularProgress} from "@material-ui/core";
import {Event} from "../../models/event.model";
import {useHistory} from "react-router-dom";
import Placeholder from "../../../assets/img/placeholder_item.png";
import {getDateTimeString} from "../../util/common";
import {readAllEvents} from "../../api/event.api";

export const Dashboard = () => {
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const delay = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearInterval(delay);
    }, []);

    if (loading) {
        return <div className="loading">
            <CircularProgress/>
        </div>
    } else {
        return <main className="dashboard">
            <header className="sub-menu">
                <div className="actions">
                    <div className="back-action">

                    </div>
                    <h3 className="title">Admin Panel</h3>
                </div>
                <div className="tabs">
                    <div className={`tab ${page == 0 ? "selected" : ""}`} onClick={() => setPage(0)}>
                        Events
                    </div>
                    <div className={`tab ${page == 1 ? "selected" : ""}`} onClick={() => setPage(1)}>
                        Reports
                    </div>
                </div>
            </header>
            {
                page == 0 ?
                    <Events/>
                    :
                    <Reports/>
            }
        </main>
    }
};

const Events = () => {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const delay = setTimeout(() => {
            readAllEvents().then((events: Event[]) => {
                setEvents(events);
            }).finally(() => {
                setLoading(false);
            });
        }, 250);

        return () => clearInterval(delay);
    }, []);

    if (loading) {
        return <div className="loading">
            <CircularProgress/>
        </div>
    } else if (events.length == 0) {
        return <section className="error">
            <p>No events found.</p>
        </section>
    } else {
        return <section className="events">
            <div className="events">
                {events.map((e, i) =>
                    <Event key={i} event={e}/>
                )}
            </div>
        </section>
    }
};

interface EventProps {
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
                <h5>{getDateTimeString(props.event.dateStart)}</h5>
            </div>
        </div>
    )
};

const Reports = () => {
    const [loading, setLoading] = useState(true);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const delay = setTimeout(() => {
            setLoading(false);
        }, 250);

        return () => clearInterval(delay);
    }, []);

    if (loading) {
        return <div className="loading">
            <CircularProgress/>
        </div>
    } else if (reports.length == 0) {
        return <section className="error">
            <p>No reports found.</p>
        </section>
    } else {
        return <section className="events">

        </section>
    }
};