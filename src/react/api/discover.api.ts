import {http} from "./_api";
import {AxiosResponse} from "axios";
import {GooglePlace} from "../models/googlePlace.model";

export const discoverPlacesByCategory = async (category: string, count: number): Promise<GooglePlace[]> => {
    return new Promise<GooglePlace[]>((resolve, reject) => {
        http.post("/places/discover", {category, count}).then((response: AxiosResponse<GooglePlace[]>) => {
            resolve(response.data);
        }).catch((error) => {
            if (error != undefined && error.response != undefined && error.response.data != undefined && typeof error.response.data == "string") {
                reject(error.response.data);
            } else {
                reject("An unknown error occurred when discovering places.");
            }
        });
    });
};