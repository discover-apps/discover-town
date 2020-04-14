import {GOOGLE_MAPS_API_KEY} from "../../util/secrets";
import axios, {AxiosResponse} from "axios";
import {GooglePlace} from "../models/googlePlace.model";

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

export const getNearbyPlaces = (category: Category, maxResults: number): Promise<GooglePlace[]> => {
    return new Promise<GooglePlace[]>((resolve, reject) => {
        const key: string = GOOGLE_MAPS_API_KEY;
        const url: string = `https://maps.googleapis.com/maps/api/place/textsearch/json?type=${category}&key=${key}`;
        axios.get(url).then(async (response: AxiosResponse) => {
            maxResults = response.data.results.length < maxResults ? response.data.results.length : maxResults;
            const places: GooglePlace[] = [];
            // loop through response.data.results
            for (let i = 0; i < maxResults; i++) {
                const r = response.data.results[i];
                const place: GooglePlace = {};
                // get place id
                if (r.place_id != undefined) {
                    place.place_id = r.place_id;
                }
                // get place name
                if (r.name != undefined) {
                    place.name = r.name;
                }
                // get place formatted address
                if (r.formatted_address) {
                    place.formatted_address = r.formatted_address;
                }
                // get latitude and longitude
                if (r.geometry && r.geometry.location && r.geometry.location.lat != undefined && r.geometry.location.lng != undefined) {
                    place.lat = r.geometry.location.lat;
                    place.lon = r.geometry.location.lng;
                }
                // get image url
                if (r.photos && r.photos.length > 0) {
                    place.image = await getImage(r.photos[0].photo_reference);
                }
                places.push(place);
            }
            resolve(places);
        }).catch((error) => {
            reject(error);
        });
    });
};

export const getPlaceDetails = (placeId: string): Promise<GooglePlace> => {
    return new Promise<GooglePlace>((resolve, reject) => {
        const key: string = GOOGLE_MAPS_API_KEY;
        const url: string = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${key}`;
        axios.get(url).then(async (response: AxiosResponse) => {
            const place: GooglePlace = {};
            const result = response.data.result;
            // get place id
            if (result.place_id != undefined) {
                place.place_id = result.place_id;
            }
            // get place name
            if (result.name != undefined) {
                place.name = result.name;
            }
            // get formatted address
            if (result.formatted_address != undefined) {
                place.formatted_address = result.formatted_address;
            }
            // get formatted phone number
            if (result.formatted_phone_number != undefined) {
                place.formatted_phone_number = result.formatted_phone_number;
            }
            // get website url
            if (result.website != undefined) {
                place.website = result.website;
            }
            // get opening hours
            const oh = result.opening_hours;
            if (oh != undefined) {
                // get open now
                if (oh.open_now != undefined) {
                    place.open_now = oh.open_now;
                }
                // get open hours
                if (oh.weekday_text != undefined && oh.weekday_text.length > 0) {
                    place.open_hours = [];
                    for (let i = 0; i < oh.weekday_text.length; i++) {
                        place.open_hours.push(oh.weekday_text[i]);
                    }
                }
            }
            // get location coordinates
            if (result.geometry != undefined && result.geometry.location != undefined) {
                // get latitude
                if (result.geometry.location.lat != undefined) {
                    place.lat = result.geometry.location.lat
                }
                // get longitude
                if (result.geometry.location.lat != undefined) {
                    place.lon = result.geometry.location.lng
                }
            }
            // get image url
            if (result.photos != undefined && result.photos.length > 0) {
                place.image = await getImage(result.photos[0].photo_reference);
            }
            resolve(place);
        }).catch((error) => {
            reject(error);
        });
    });
};

export const getImage = (photoReference: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const height: number = 250;
        const key: string = GOOGLE_MAPS_API_KEY;
        const url: string = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}&key=${key}&maxheight=${height}`;
        axios.get(url).then((response: AxiosResponse) => {
            // save image to file
            // decode the image to base64
            // delete the image file
            // return base64 string
            resolve(url);
        }).catch((error) => {
            reject(error);
        });
    });
};

export const searchNearbyPlaces = (query: string, maxResults: number): Promise<GooglePlace[]> => {
    return new Promise<GooglePlace[]>((resolve, reject) => {
        const key: string = GOOGLE_MAPS_API_KEY;
        const url: string = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURI(query)}&key=${key}`;
        axios.get(url).then((response: AxiosResponse) => {
            maxResults = response.data.results.length < maxResults || maxResults == -1 ? response.data.results.length : maxResults;
            const results: GooglePlace[] = [];
            // loop through response.data.results
            for (let i = 0; i < maxResults; i++) {
                const r = response.data.results[i];
                if (r.formatted_address && r.name && r.geometry && r.geometry.location && r.geometry.location.lat != undefined && r.geometry.location.lng != undefined) {
                    results.push({
                        name: r.name,
                        formatted_address: r.formatted_address,
                        lat: r.geometry.location.lat,
                        lon: r.geometry.location.lng
                    });
                }
            }
            resolve(results);
        }).catch((error) => {
            reject(error);
        });
    });
};

export const getCategoryFromString = (category: string): Promise<Category> => {
    return new Promise<Category>((resolve, reject) => {
        switch (category.toLowerCase()) {
            case "zoo":
                resolve(Category.Zoo);
                break;
            case "bar":
                resolve(Category.Bar);
                break;
            case "gym":
                resolve(Category.Gym);
                break;
            case "park":
                resolve(Category.Park);
                break;
            case "cafe":
                resolve(Category.Cafe);
                break;
            case "museum":
                resolve(Category.Museum);
                break;
            case "stadium":
                resolve(Category.Stadium);
                break;
            case "lodging":
                resolve(Category.Lodging);
                break;
            case "aquarium":
                resolve(Category.Aquarium);
                break;
            case "nightclub":
                resolve(Category.Nightclub);
                break;
            case "restaurant":
                resolve(Category.Restaurant);
                break;
            case "university":
                resolve(Category.University);
                break;
            case "campground":
                resolve(Category.Campground);
                break;
            case "art_gallery":
                resolve(Category.ArtGallery);
                break;
            case "shopping_mall":
                resolve(Category.ShoppingMall);
                break;
            case "movie_theatre":
                resolve(Category.MovieTheater);
                break;
            case "bowling_alley":
                resolve(Category.BowlingAlley);
                break;
            case "amusement_park":
                resolve(Category.AmusementPark);
                break;
            case "tourist_attraction":
                resolve(Category.TouristAttraction);
                break;
            default:
                reject(`Invalid category: ${category}`);
                break;
        }
    });
};