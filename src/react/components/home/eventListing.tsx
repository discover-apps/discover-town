import React from 'react';
import {useHistory} from "react-router-dom";
import placeholder from "../../../assets/img/placeholder_person.jpg";

interface Props {
    key: number;
}

export const HomeEvent = (props: Props) => {
    const history = useHistory();

    const navigateEvent = () => {
        history.push('/event');
    };

    return (
        <article className="paper elevation-3 event-listing" key={props.key} onClick={() => navigateEvent()}>
            <h5>Monday, February 3, 2020</h5>
            <h1>Speed Networking & Business MatchMaking: Fastest Way to Expand Your Network</h1>
            <div className="member">
                <div className="image">
                    <img src={placeholder} alt="profile_image"/>
                </div>
                <div className="details">
                    <h3>Google Events</h3>
                    <span>100 Followers</span>
                </div>
            </div>
        </article>
    )
};

export default HomeEvent;