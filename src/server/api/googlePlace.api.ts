import {GOOGLE_MAPS_API_KEY} from "../../util/secrets";
import axios, {AxiosResponse} from "axios";
import {SearchResult} from "../models/searchResult.model";

export enum Category {
    Zoo = 'zoo',
    Bar = 'bar',
    Gym = 'gym',
    Park = 'park',
    Cafe = 'cafe',
    Museum = 'Museum',
    Stadium = 'stadium',
    Lodging = 'lodging',
    Aquarium = 'aquarium',
    Nightclub = 'Nightclub',
    restaurant = 'restaurant',
    University = 'university',
    Campground = 'campground',
    ArtGallery = 'art_gallery',
    ShoppingMall = 'shopping_mall',
    MovieTheater = 'movie_theater',
    BowlingAllery = 'bowling_alley',
    AmusementPark = 'amusement_park',
    TouristAttraction = 'tourist_attraction'
}

export interface GooglePlace {
    name: string;
    formatted_address: string;
    lat: number;
    lon: number;
    imgUrl?: string;
}

export const getNearbyPlaces = (category: Category, maxResults: number): Promise<GooglePlace[]> => {
    return new Promise<GooglePlace[]>((resolve, reject) => {
        const key: string = GOOGLE_MAPS_API_KEY;
        const url: string = `https://maps.googleapis.com/maps/api/place/textsearch/json?type=amusement_park&key=${key}`;
        axios.get(url).then(async (response: AxiosResponse) => {
            maxResults = response.data.results.length < maxResults ? response.data.results.length : maxResults;
            const results: SearchResult[] = [];
            // loop through response.data.results
            for (let i = 0; i < maxResults; i++) {
                const r = response.data.results[i];
                if (r.formatted_address && r.name && r.geometry && r.geometry.location && r.geometry.location.lat != undefined && r.geometry.location.lng != undefined) {
                    const result: SearchResult = {
                        name: r.name,
                        formatted_address: r.formatted_address,
                        lat: r.geometry.location.lat,
                        lon: r.geometry.location.lng
                    };
                    // get image for this result
                    if (r.photos && r.photos.length > 0) {
                        const image: string = await getImage(r.photos[0].photo_reference);
                        result.imgUrl = image;
                    }
                    results.push(result);
                }
            }
            resolve(results);
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
            resolve(response.data);
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
            const results: SearchResult[] = [];
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