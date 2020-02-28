import axios, {AxiosError, AxiosResponse} from "axios";
import {User} from "../../models/user";

const baseUrl = "http://localhost:3000/api";

export const loginUser = (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        axios.post(baseUrl + "/login", {
            email: email,
            password: password
        }).then((response: AxiosResponse) => {
            resolve({_id: response.data._id, email: response.data.email, password: response.data.password})
        }).catch((error: AxiosError) => {
            // TODO: Handle error here
            if (error.response.status == 404) {
                reject("Unable to connect to login server")
            } else if (error.response.status == 500) {
                reject("An error occurred on login server")
            }
            reject("An unknown error has occurred");
        });
    });
};