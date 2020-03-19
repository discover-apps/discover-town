import axios, {AxiosResponse} from "axios";
import Event from '../models/event.model';

export const searchPlaces = async (query: string): Promise<any> => {
    const response: AxiosResponse = await axios.post('/api/event/places', {query});
    if (response.status == 200) {
        return response.data;
    }
    throw response;
};

export const createEventRecord = async (event: Event): Promise<string> => {
    const response: AxiosResponse = await axios.post('/api/event/create', event);
    if (response.status == 200) {
        return response.data;
    }
    throw response;
};