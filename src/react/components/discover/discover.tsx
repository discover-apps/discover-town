import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {GooglePlace} from "../../models/googlePlace.model";
import {discoverPlacesByCategory} from "../../api/discover.api";

export const Discover = () => {
    return (
        <main className="discover">
            <DiscoverCategory category={Category.TouristAttraction}/>
            <DiscoverCategory category={Category.AmusementPark}/>
            <DiscoverCategory category={Category.ArtGallery}/>
            <DiscoverCategory category={Category.Museum}/>
            <DiscoverCategory category={Category.Park}/>
            <DiscoverCategory category={Category.Zoo}/>
            <DiscoverCategory category={Category.Cafe}/>
            <DiscoverCategory category={Category.Restaurant}/>
            <DiscoverCategory category={Category.Lodging}/>
            <DiscoverCategory category={Category.Stadium}/>
            <DiscoverCategory category={Category.Aquarium}/>
            <DiscoverCategory category={Category.ShoppingMall}/>
            <DiscoverCategory category={Category.BowlingAlley}/>
            <DiscoverCategory category={Category.Bar}/>
            <DiscoverCategory category={Category.Nightclub}/>
            <DiscoverCategory category={Category.University}/>
            <DiscoverCategory category={Category.Gym}/>
            <DiscoverCategory category={Category.Campground}/>
            <DiscoverCategory category={Category.MovieTheater}/>
        </main>
    );
};

interface DiscoverCategoryProps {
    category: Category;
}

const DiscoverCategory = (props: DiscoverCategoryProps) => {
    const [places, setPlaces] = useState<GooglePlace[]>([]);
    useEffect(() => {
        discoverPlacesByCategory(props.category).then((places: GooglePlace[]) => {
            setPlaces(places);
        });
    }, []);

    return (
        <div className="category">
            <div className="menu">
                <div className="title">
                    {props.category.replace("_", " ")}
                </div>
                <div className="link">
                    <Link to={`/`}>See all ></Link>
                </div>
            </div>
            <div className="items">
                {places.map((p: GooglePlace) => {
                    return <DiscoverItem key={p.name} place={p}/>
                })}
            </div>
        </div>
    );
};

interface DiscoverItemProps {
    place: GooglePlace;
}

const DiscoverItem = (props: DiscoverItemProps) => {
    return (
        <div className="item">
            <img src={props.place.image} alt="place_image"/>
            <div className="overlay">
                <span>{props.place.name}</span>
            </div>
        </div>
    );
};

export enum Category {
    Zoo = "zoo",
    Bar = "bar",
    Gym = "gym",
    Park = "park",
    Cafe = "cafe",
    Museum = "museum",
    Stadium = "stadium",
    Lodging = "lodging",
    Aquarium = "aquarium",
    Nightclub = "nightclub",
    Restaurant = "restaurant",
    University = "university",
    Campground = "campground",
    ArtGallery = "art_gallery",
    ShoppingMall = "shopping_mall",
    MovieTheater = "movie_theater",
    BowlingAlley = "bowling_alley",
    AmusementPark = "amusement_park",
    TouristAttraction = "tourist_attraction"
}