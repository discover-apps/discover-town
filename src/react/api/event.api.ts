import axios, {AxiosResponse} from "axios";
import Event from '../models/event.model';
import {http} from "./_api";

export const searchPlaces = async (query: string): Promise<any> => {
    const response: AxiosResponse = await axios.post('/api/event/places', {query});
    if (response.status == 200) {
        return response.data;
    }
    throw response;
};

export const createEventRecord = async (event: Event): Promise<Event> => {
    return new Promise<Event>((resolve, reject) => {
        http.post('/event/create', event).then((response: AxiosResponse<Event>) => {
            resolve(response.data);
        }).catch((error) => {
            if (error != undefined && error.response != undefined && error.response.data != undefined && typeof error.response.data == 'string') {
                reject(error.response.data);
            } else {
                reject('An unknown error occurred when creating event record.');
            }
        });
    });
};