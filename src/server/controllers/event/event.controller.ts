import {Request, Response} from 'express';
import axios, {AxiosResponse} from "axios";
import {SearchResult} from "../../models/searchResult.model";
import Event from '../../models/event.model';
import {createEvent} from "../../database/event/event.database";

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

export const create = async (req: Request, res: Response) => {
    // get user id from req
    const userId = Number.parseInt(req.user.toString());
    // get event object from body
    const event: Event = req.body;
    createEvent(event, userId).then((eventId: number) => {
        event.id = eventId;
        res.status(200).json(event);
    }).catch((error) => {
        res.status(500).json(error);
    });
};