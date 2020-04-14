import {Request, Response} from "express";
import {Category, getCategoryFromString, getNearbyPlaces, getPlaceDetails} from "../../api/googlePlace.api";
import {GooglePlace} from "../../models/googlePlace.model";

export const readPlacesByCategory = (req: Request, res: Response) => {
    const c: string = req.body.category;
    const n: number = req.body.count;
    getCategoryFromString(c).then((category: Category) => {
        getNearbyPlaces(category, n).then((places: GooglePlace[]) => {
            res.status(200).json(places);
        }).catch((error) => {
            res.status(400).json(error);
        })
    }).catch((error) => {
        res.status(400).json(error);
    });
};

export const readPlaceDetails = (req: Request, res: Response) => {
    const place_id: string = req.body.place_id;
    getPlaceDetails(place_id).then((place: GooglePlace) => {
        res.status(200).json(place);
    }).catch((error) => {
        res.status(400).json(error);
    });
};