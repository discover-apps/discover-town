import {http} from "./_api";
import {AxiosResponse} from "axios";
import {GooglePlace} from "../models/googlePlace.model";

export const readPlacesByCategory = async (category: string, count: number): Promise<GooglePlace[]> => {
    return new Promise<GooglePlace[]>((resolve, reject) => {
        http.post("/places/readPlacesByCategory", {category, count}).then((response: AxiosResponse<GooglePlace[]>) => {
            resolve(response.data);
        }).catch((error) => {
            if (error != undefined && error.response != undefined && error.response.data != undefined && typeof error.response.data == "string") {
                reject(error.response.data);
            } else {
                reject("An unknown error occurred when reading places by category.");
            }
        });
    });
};

export const readPlaceDetails = async (place_id: string): Promise<GooglePlace> => {
    return new Promise<GooglePlace>((resolve, reject) => {
        http.post("/places/readPlaceDetails", {place_id}).then((response: AxiosResponse<GooglePlace>) => {
            resolve(response.data);
        }).catch((error) => {
            if (error != undefined && error.response != undefined && error.response.data != undefined && typeof error.response.data == "string") {
                reject(error.response.data);
            } else {
                reject("An unknown error occurred when reading place details.");
            }
        });
    });
};