import React from 'react';
import ClockIcon from "@material-ui/icons/AccessTime";
import LocationIcon from "@material-ui/icons/LocationOn";
import GoogleMaps from "./googleMaps";

export const EventInformation = () => {
    return (
        <section className="paper elevation-3 information">
            <div className="info">
                <div className="icon">
                    <ClockIcon/>
                </div>
                <div className="text">
                    <p>Monday, February 3, 2020</p>
                    <p>6:30 PM to 8:30 PM</p>
                </div>
            </div>
            <div className="info">
                <div className="icon">
                    <LocationIcon/>
                </div>
                <div className="text">
                    <p>The Ainsworth</p>
                    <p>45 E 33rd St New York, NY</p>
                </div>
            </div>
            <div className="map">
                <GoogleMaps/>
            </div>
        </section>
    );
};

export default EventInformation;