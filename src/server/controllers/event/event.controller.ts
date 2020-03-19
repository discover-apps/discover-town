import {Request, Response} from 'express';
import axios, {AxiosResponse} from "axios";
import {SearchResult} from "../../models/searchResult.model";

export const searchPlaces = async (req: Request, res: Response) => {
    const query = req.body.query;
    const key: string = 'AIzaSyCFghWiQ6YR9gvIn572y9yTD49K3igUeiI';
    const url: string = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURI(query)}&key=${key}`;
    axios.get(url).then((response: AxiosResponse) => {
        const results: SearchResult[] = [];
        // loop through response.data.results
        for (let i = 0; i < response.data.results.length; i++) {
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
        return res.status(200).json(results);
    }).catch((error) => {
        return res.status(500).json(error);
    });
};

export const createEvent = async (req: Request, res: Response) => {
    const event: Event = req.body;
    // validate event properties
    // Title must be between 5 - 32 characters
    // Description must be between 5 - 550 characters
    // Date must be greater than or equal to today
    // Location must be a valid location

    // insert database record
    // send back response
    res.status(200).json('Successfully created event.');
};