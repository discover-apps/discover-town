import React from 'react';
import Placeholder from '../../../assets/img/placeholder_person.jpg';

export const ProfileHeader = () => {
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
                    <button>Follow</button>
                </div>
            </div>
            <div className="menu">
                <div className="option selected">
                    activity
                </div>
                <div className="option">
                    events
                </div>
                <div className="option">
                    details
                </div>
            </div>
        </section>
    )
};