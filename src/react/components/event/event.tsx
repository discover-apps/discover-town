import React from 'react';
import EventTitle from "./eventTitle";
import EventInformation from "./eventInformation";
import EventDetails from "./eventDetails";

export const Event = () => {
    return (
        <main className="event">
            <EventTitle/>
            <EventInformation/>
            <EventDetails/>
        </main>
    )
};

export default Event;