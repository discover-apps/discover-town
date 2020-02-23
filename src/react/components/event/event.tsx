import React from 'react';
import EventTitle from "./eventTitle";
import EventInformation from "./eventInformation";

export const Event = () => {
    return (
        <main className="event">
            <EventTitle/>
            <EventInformation/>
        </main>
    )
};

export default Event;