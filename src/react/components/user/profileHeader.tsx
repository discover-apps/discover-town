import React from 'react';
import {User} from "../../models/user.model";
import {useSelector} from "react-redux";
import Placeholder from '../../../assets/img/placeholder_person.jpg';
import {useHistory} from 'react-router-dom';

interface Props {
    user: User;
    selectPage: any;
    selectedPage: number;
}

export const ProfileHeader = (props: Props) => {

    const currentUser = useSelector((state: any) => state.auth.currentUser);
    const history = useHistory();

    const selected = (page: number) => {
        return props.selectedPage == page ? 'selected' : '';
    };

    const navigateTo = (url: string) => {
        history.push(url);
    };

    return (
        <section className="profile-header elevation-4">
            <div className="user">
                <div className="photo">
                    <img src={Placeholder} alt="user_image"/>
                </div>
                <div className="details">
                    <h3>{props.user ? props.user.username : 'Loading...'}</h3>
                    <h5>100 Followers</h5>
                </div>
                <div className="follow-button">
                    {currentUser ?
                        <button className="outline-button"
                                onClick={() => navigateTo('/profile/edit/')}>
                            Edit
                        </button>
                        :
                        <button>Follow</button>}
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