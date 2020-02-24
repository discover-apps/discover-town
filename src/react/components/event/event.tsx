import React from 'react';
import EventTitle from "./eventTitle";
import EventInformation from "./eventInformation";
import EventDetails from "./eventDetails";
import {EventAttendees} from "./eventAttendees";

export const Event = () => {
    return (
        <main className="event">
            <EventTitle/>
            <EventInformation/>
            <EventDetails/>
            <EventAttendees/>
        </main>
    )
};

export default Event;