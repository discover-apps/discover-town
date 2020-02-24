import React from 'react';

export const EventAttendees = () => {
    return (
        <section>
            <div className="paper elevation-3 attendees-title">
                <h2>Attendees (12)</h2>
                <a>See all</a>
            </div>
            <div className="attendees-list">
                <Attendee/>
                <Attendee/>
            </div>
        </section>
    )
};

export const Attendee = () => {
    return (
        <div className="attendee paper elevation-3">
            <div className="image">
                <img src="" alt="profile_image"/>
            </div>
            <h3>Jason Efthimiou</h3>
            <h4>100 followers</h4>
        </div>
    )
};

export default EventAttendees;