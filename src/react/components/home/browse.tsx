import React, {useState} from 'react';
import HomeEvent from "./eventListing";
import ShowMore from "./showMore";

export const Browse = () => {
    const [events, setEvents] = useState<number[]>([1, 2, 3]);

    const showMore = () => {
        let e = [...events];
        for (let i = 0; i < 3; i++) {
            e.push(e.length + 1);
        }
        setEvents(e);
    };

    return (<main>
        {events.map(key => (<HomeEvent key={key}/>))}
        <ShowMore showMore={showMore}/>
    </main>)
};

export default Browse;