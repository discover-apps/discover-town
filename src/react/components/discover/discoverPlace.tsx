import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {GooglePlace} from "../../models/googlePlace.model";
import ClockIcon from "@material-ui/icons/AccessTime";
import StorefrontIcon from "@material-ui/icons/Storefront";
import LanguageIcon from "@material-ui/icons/Language";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationIcon from "@material-ui/icons/LocationOn";
import {GoogleMaps} from "../maps/googleMap";
import {readPlaceDetails} from "../../api/places.api";
import {CircularProgress} from "@material-ui/core";

export const DiscoverPlace = () => {
    const history = useHistory();
    const {place_id} = useParams();
    const [place, setPlace] = useState<GooglePlace>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        readPlaceDetails(place_id).then((place: GooglePlace) => {
            setPlace(place);
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    if (loading) {
        return <div className="loading">
            <CircularProgress/>
        </div>
    } else {
        return <main className="discover-place">
            <header className="sub-menu">
                <div className="actions">
                    <div className="back-action">
                        <a onClick={() => history.goBack()}>{"< Back"}</a>
                    </div>
                    <h3 className="title">Place</h3>
                </div>
            </header>
            <div className="body">
                <section className="paper elevation-3 title">
                    <h1>{place.name}</h1>
                </section>
                <section className="paper elevation-3 image">
                    <img src={place.image} alt="place_image"/>
                </section>
                <section className="paper elevation-3 information">
                    <div className="info">
                        <div className="icon">
                            <LocationIcon/>
                        </div>
                        <div className="text">
                            <p>{place.formatted_address}</p>
                        </div>
                    </div>
                    {
                        !place.formatted_phone_number ? "" :
                            <div className="info">
                                <div className="icon">
                                    <PhoneIcon/>
                                </div>
                                <div className="text">
                                    <p>{place.formatted_phone_number}</p>
                                </div>
                            </div>
                    }
                    {
                        !place.website ? "" :
                            <div className="info">
                                <div className="icon">
                                    <LanguageIcon/>
                                </div>
                                <div className="text">
                                    <p><a href={place.website}>{place.website}</a></p>
                                </div>
                            </div>
                    }
                    {
                        !place.open_now == undefined ? "" :
                            <div className="info">
                                <div className="icon">
                                    <StorefrontIcon/>
                                </div>
                                <div className="text">
                                    <p>{place.open_now ? "Currently open" : "Currently closed"}</p>
                                </div>
                            </div>
                    }
                    {
                        !place.open_hours ? "" :
                            <div className="info-extended">
                                <div className="icon">
                                    <ClockIcon/>
                                </div>
                                <div className="text">
                                    Hours of Operation
                                </div>
                                <div className="extended">
                                    {place.open_hours.map((h, i) => <p key={i}>{h}</p>)}
                                </div>
                            </div>
                    }
                    <div className="map">
                        <GoogleMaps lat={place.lat} lon={place.lon}/>
                    </div>
                </section>
            </div>
        </main>
    }
};