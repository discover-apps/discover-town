import React from 'react';
import Placeholder from '../../../assets/img/placeholder_person.jpg';
import {User} from "../../models/user.model";
import {useSelector} from "react-redux";

interface Props {
    user: User;
    selectPage: any;
    selectedPage: number;
}

export const ProfileHeader = (props: Props) => {

    const currentUser = useSelector((state: any) => state.auth.currentUser);

    const selected = (page: number) => {
        return props.selectedPage == page ? 'selected' : '';
    };

    return (
        <section className="profile-header elevation-4">
            <div className="user">
                <div className="photo">
                    <img src={Placeholder} alt="user_image"/>
                </div>
                <div className="details">
                    <h3>Google Events</h3>
                    <h5>100 Followers</h5>
                </div>
                <div className="follow-button">
                    {currentUser ? <button className="outline-button">Edit</button> : <button>Follow</button>}
                </div>
            </div>
            <div className="menu">
                <div className={`option ${selected(0)}`} onClick={() => props.selectPage(0)}>
                    activity
                </div>
                <div className={`option ${selected(1)}`} onClick={() => props.selectPage(1)}>
                    events
                </div>
                <div className={`option ${selected(2)}`} onClick={() => props.selectPage(2)}>
                    details
                </div>
            </div>
        </section>
    )
};