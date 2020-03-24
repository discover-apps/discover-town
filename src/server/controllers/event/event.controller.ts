import {Request, Response} from 'express';
import axios, {AxiosResponse} from "axios";
import {SearchResult} from "../../models/searchResult.model";
import Event from '../../models/event.model';
import {
    addEventAttendee,
    createEvent,
    readEventById,
    readEventsByUser,
    removeEventAttendee,
    userAttendingEvent
} from "../../database/event/event.database";
import User from "../../models/user.model";

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

export const readById = async (req: Request, res: Response) => {
    // get event id from req body
    const eventId: number = req.body.eventId;
    readEventById(eventId).then((event: Event) => {
        res.status(200).json(event);
    }).catch((error) => {
        res.status(300).json(error);
    });
};

export const readByUser = async (req: Request, res: Response) => {
    // get user from req body
    const user: User = req.body;
    readEventsByUser(user).then((events: Event[]) => {
        res.status(200).json(events);
    }).catch((error) => {
        res.status(300).json(error);
    });
};

export const attendEvent = async (req: Request, res: Response) => {
    const user: User = req.body.user;
    const event: Event = req.body.event;
    addEventAttendee(event, user).then((message: string) => {
        res.status(200).json(message);
    }).catch((error) => {
        res.status(500).json(error);
    });
};

export const unattendEvent = async (req: Request, res: Response) => {
    const user: User = req.body.user;
    const event: Event = req.body.event;
    removeEventAttendee(event, user).then((message: string) => {
        res.status(200).json(message);
    }).catch((error) => {
        res.status(500).json(error);
    });
};

export const attendingEvent = async (req: Request, res: Response) => {
    const user: User = req.body.user;
    const event: Event = req.body.event;
    userAttendingEvent(event, user).then((attending: boolean) => {
        res.status(200).json(attending);
    }).catch((error) => {
        res.status(500).json(error);
    });
};