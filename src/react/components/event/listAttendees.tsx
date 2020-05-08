import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {User} from "../../models/user.model";
import {readEventAttendees, readEventById} from "../../api/event.api";
import {Event} from "../../models/event.model";
import {CircularProgress} from "@material-ui/core";
import Placeholder from "../../../assets/img/placeholder_person.jpg";
import {FollowButton} from "../user/profileHeader";

export const ListAttendees = () => {
    const history = useHistory();
    const {id} = useParams();
    return (
        <main className="attendees">
            <header className="sub-menu">
                <div className="actions">
                    <div className="back-action">
                        <a onClick={() => history.push(`/event/view/${id}`)}>{"< Back"}</a>
                    </div>
                    <h3 className="title">Event</h3>
                    <div className="forward-action">
                        <a>Report</a>
                    </div>
                </div>
            </header>
            <Attendees/>
        </main>
    )
};

const Attendees = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState();
    const [attendees, setAttendees] = useState<User[]>([]);
    useEffect(() => {
        readEventById(Number.parseInt(id)).then((event: Event) => {
            readEventAttendees(event).then((users: User[]) => {
                setAttendees(users);
            });
        });
    }, []);

    if (loading) {
        return <section>
            <div className="loading">
                <CircularProgress/>
            </div>
        </section>
    } else if (attendees.length > 0) {
        return <section className="followers">
            {attendees.map((u, i) => <Attendee key={i} user={u}/>)}
        </section>
    } else {
        return <section>
            <p className="empty">This event has no attendees!</p>
        </section>
    }
};

interface AttendeeProps {
    user: User;
}

const Attendee = (props: AttendeeProps) => {
    const history = useHistory();
    const clickFollower = () => {
        history.push(`/profile/${props.user.username}`);
    };
    return (
        <div className="follower">
            <div className="image" onClick={clickFollower}>
                <img src={Placeholder} alt="user_image"/>
            </div>
            <div className="details" onClick={clickFollower}>
                <span className="username">{props.user.username}</span>
            </div>
            <div className="follow-button">
                <FollowButton user={props.user}/>
            </div>
        </div>
    );
};