import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {GooglePlace} from "../../models/googlePlace.model";
import {readPlacesByCategory} from "../../api/places.api";
import {DiscoverItem} from "./discoverItem";
import {CircularProgress} from "@material-ui/core";

export const DiscoverCategory = () => {
    const {category} = useParams();
    const [places, setPlaces] = useState<GooglePlace[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    useEffect(() => {
        setLoading(true);
        readPlacesByCategory(category, 100).then((places: GooglePlace[]) => {
            setPlaces(places);
        }).catch(error => {
            setError("An error occurred, retrying...");
        }).finally(() => {
            setLoading(false);
        });
    }, [error]);

    if (loading) {
        return <div className="loading">
            <CircularProgress/>
        </div>
    } else if (error) {
        return <div className="error">
            {error}
        </div>
    } else {
        return (
            <main className="discover">
                <header className="sub-menu">
                    <div className="actions">
                        <div className="back-action">
                            <Link to={`/discover`}>{"< Back"}</Link>
                        </div>
                        <h3 className="title">{category.replace("_", " ")}</h3>
                    </div>
                </header>
                <div className="category">
                    <div className="items">
                        {places.map((p: GooglePlace) => {
                            return <DiscoverItem key={p.name} place={p}/>
                        })}
                    </div>
                </div>
            </main>
        );
    }
};