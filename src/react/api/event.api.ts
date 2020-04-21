import axios, {AxiosResponse} from "axios";
import moment from "moment";
import {handleHttpError, http} from "./_api";
import {Event} from "../models/event.model";
import {User} from "../models/user.model";

export const searchPlaces = async (query: string): Promise<any> => {
    const response: AxiosResponse = await axios.post("/api/event/places", {query});
    if (response.status == 200) {
        return response.data;
    }
    throw response;
};

export const createEventRecord = async (event: Event): Promise<Event> => {
    return new Promise<Event>((resolve, reject) => {
        http.post("/event/create", event).then((response: AxiosResponse<Event>) => {
            resolve(response.data);
        }).catch((error) => {
            if (error != undefined && error.response != undefined && error.response.data != undefined && typeof error.response.data == "string") {
                reject(error.response.data);
            } else {
                reject("An unknown error occurred when creating event record.");
            }
        });
    });
};

export const updateEventRecord = async (event: Event): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        http.post("/event/update", {event}).then((response: AxiosResponse<string>) => {
            resolve(response.data);
        }).catch((error) => {
            reject(handleHttpError(error, "An unknown error occurred when updating event record."));
        });
    });
};

export const deleteEventRecord = async (event: Event): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        http.post("/event/delete", {event}).then((response: AxiosResponse<string>) => {
            resolve(response.data);
        }).catch((error) => {
            handleHttpError(error, "An unknown error occurred when deleting event.");
        });
    });
};

export const readEventById = (eventId: number): Promise<Event> => {
    return new Promise<Event>((resolve, reject) => {
        http.post("/event/readById", {eventId}).then((response: AxiosResponse<Event>) => {
            if (response.data.id == undefined) {
                resolve(undefined);
            } else {
                resolve({
                    ...response.data,
                    dateStart: moment(response.data.dateStart).toDate(),
                    datePosted: moment(response.data.dateStart).toDate()
                });
            }
        }).catch((error) => {
            reject(error);
        });
    });
};

export const readEventsByUser = (user: User): Promise<Event[]> => {
    return new Promise<Event[]>((resolve, reject) => {
        http.post("/event/readByUser", user).then((response: AxiosResponse<Event[]>) => {
            const events: Event[] = [];
            for (let i = 0; i < response.data.length; i++) {
                events.push({
                    ...response.data[i],
                    dateStart: moment(response.data[i].dateStart).toDate(),
                    datePosted: moment(response.data[i].dateStart).toDate()
                });
            }
            resolve(events);
        }).catch((error) => {
            if (error != undefined && error.response != undefined && error.response.data != undefined && typeof error.response.data == "string") {
                reject(error.response.data);
            } else {
                reject("An unknown error occurred when retrieving event records for user.");
            }
        });
    });
};

export const readAttendingByUser = (user: User): Promise<Event[]> => {
    return new Promise<Event[]>((resolve, reject) => {
        http.post("/event/readAttending", {user}).then((response: AxiosResponse<Event[]>) => {
            const events: Event[] = [];
            for (let i = 0; i < response.data.length; i++) {
                events.push({
                    ...response.data[i],
                    dateStart: moment(response.data[i].dateStart).toDate(),
                    datePosted: moment(response.data[i].dateStart).toDate()
                });
            }
            resolve(events);
        }).catch((error) => {
            if (error != undefined && error.response != undefined && error.response.data != undefined && typeof error.response.data == "string") {
                reject(error.response.data);
            } else {
                reject("An unknown error occurred when retrieving event records for user.");
            }
        });
    });
};

export const readEventsByFollowers = (): Promise<Event[]> => {
    return new Promise<Event[]>((resolve, reject) => {
        http.post("/event/readByFollowers").then((response: AxiosResponse<Event[]>) => {
            const events: Event[] = [];
            for (let i = 0; i < response.data.length; i++) {
                events.push({
                    ...response.data[i],
                    dateStart: moment(response.data[i].dateStart).toDate(),
                    datePosted: moment(response.data[i].dateStart).toDate()
                });
            }
            resolve(events);
        }).catch((error) => {
            reject(handleHttpError(error, "An unknown error occurred when retrieving event from user followers."));
        });
    });
};

export const readEventAttendees = async (event: Event): Promise<User[]> => {
    return new Promise<User[]>((resolve, reject) => {
        http.post("/event/readAttendees", {event}).then((response: AxiosResponse<User[]>) => {
            resolve(response.data);
        }).catch((error) => {
            reject(handleHttpError(error, "An unknown error occurred when retrieving attendees for event."));
        });
    });
};

export const createEventAttendee = async (event: Event): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        http.post("/event/createAttendee", {event}).then((response: AxiosResponse<string>) => {
            resolve(response.data);
        }).catch((error) => {
            reject(handleHttpError(error, "An unknown error occurred when creating event attendee."));
        });
    });
};

export const deleteEventAttendee = async (event: Event): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        http.post("/event/deleteAttendee", {event}).then((response: AxiosResponse<string>) => {
            resolve(response.data);
        }).catch((error) => {
            reject(handleHttpError(error, "An unknown error occurred when deleting event attendee."));
        });
    });
};

export const userAttendingEvent = async (event: Event): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        http.post("/event/attendingEvent", {event}).then((response: AxiosResponse<boolean>) => {
            resolve(response.data);
        }).catch((error) => {
            reject(handleHttpError(error, "An unknown error occurred when checking if user is attending event."));
        });
    });
};