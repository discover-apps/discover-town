import axios, {AxiosResponse} from "axios";

export const searchPlaces = async (query: string): Promise<any> => {
    const response: AxiosResponse = await axios.post('/api/event/places', {query});
    if (response.status == 200) {
        return response.data;
    }
    throw response;
};