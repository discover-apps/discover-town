import React from "react";
import {GooglePlace} from "../../models/googlePlace.model";

interface DiscoverItemProps {
    place: GooglePlace;
}

export const DiscoverItem = (props: DiscoverItemProps) => {
    return (
        <div className="item">
            <img src={props.place.image} alt="place_image"/>
            <div className="overlay">
                <span>{props.place.name}</span>
            </div>
        </div>
    );
};