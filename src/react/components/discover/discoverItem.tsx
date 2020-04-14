import React from "react";
import {GooglePlace} from "../../models/googlePlace.model";
import {useHistory} from "react-router-dom";

interface DiscoverItemProps {
    place: GooglePlace;
}

export const DiscoverItem = (props: DiscoverItemProps) => {

    const history = useHistory();
    const clickItem = () => {
        history.push(`/discover/place/${props.place.place_id}`)
    };

    return (
        <div className="item" onClick={clickItem}>
            <img src={props.place.image} alt="place_image"/>
            <div className="overlay">
                <span>{props.place.name}</span>
            </div>
        </div>
    );
};