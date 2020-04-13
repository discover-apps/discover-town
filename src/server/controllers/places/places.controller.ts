import {Request, Response} from "express";
import {Category, getCategoryFromString, getNearbyPlaces} from "../../api/googlePlace.api";
import {GooglePlace} from "../../models/googlePlace.model";

export const discoverPlaces = (req: Request, res: Response) => {
    const c: string = req.body.category;
    getCategoryFromString(c).then((category: Category) => {
        getNearbyPlaces(category, 4).then((places: GooglePlace[]) => {
            res.status(200).json(places);
        });
    }).catch((error) => {
        res.status(400).json(error);
    });
};