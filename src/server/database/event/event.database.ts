import Event, {EventLocation} from "../../models/event.model";
import axios, {AxiosResponse} from 'axios';
import {database} from "../_database";
import {UserHostingEvent} from "../../../react/models/event.model";
import User from "../../models/user.model";

export const createEvent = (event: Event, userId: number): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        // validate event properties
        // Title must be between 5 - 32 characters
        if (event.title.length < 5 || event.title.length > 32) {
            return reject('Title must be between 5-32 characters.');
        }
        // Description must be between 5 - 1000 characters
        if (event.description.length < 5 || event.description.length > 1000) {
            return reject('Description must be between 5-1000 characters.');
        }
        // Date must be greater than or equal to today
        if (event.dateStart < event.datePosted) {
            return reject('Date must be greater than or equal to today.');
        }
        // Location must be a valid location
        validLocation(event.address_location).then((location: EventLocation) => {
            // update event location to validated address
            event.address_location = location.formatted_address;
            event.lat = location.lat;
            event.lon = location.lon;
            // insert record into event table
            database<Event>('Events')
                .insert(event)
                .then((eventId: any) => {
                    // insert record into UserHostingEvent table
                    database<UserHostingEvent>('UserHostingEvent')
                        .insert({
                            userId: userId,
                            eventId: eventId[0]
                        }).catch(error => {
                        reject(error);
                    });
                    resolve(eventId[0]);
                })
                .catch((error: any) => {
                    reject(error);
                });
        }).catch((error) => {
            reject(error);
        });
    });
};

export const validLocation = (address: string): Promise<EventLocation> => {
    return new Promise<EventLocation>((resolve, reject) => {
        const key = 'AIzaSyCFghWiQ6YR9gvIn572y9yTD49K3igUeiI';
        const url: string = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${key}`;
        axios.get(url).then((response: AxiosResponse) => {
            // check if response contains results
            if (response.data.results && response.data.results.length > 0) {
                const r = response.data.results[0];
                // check if first result contains formatted address
                // check if first result contains lat, lon
                if (r.formatted_address && r.geometry && r.geometry.location && r.geometry.location.lat && r.geometry.location.lng) {
                    resolve({
                        formatted_address: r.formatted_address,
                        lat: r.geometry.location.lat,
                        lon: r.geometry.location.lng
                    });
                } else {
                    reject('Error retrieving location, please try a different address.');
                }
            } else {
                reject('Unable to locate address, please try a different address.');
            }
        }).catch((error) => {
            reject(error);
        });
    });
};

export const readEventById = (eventId: number): Promise<Event> => {
    return new Promise<Event>((resolve, reject) => {
        database<Event>('Events')
            .select()
            .where({id: eventId})
            .then((record) => {
                resolve(record[0]);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const readEventsByUser = (user: User): Promise<Event[]> => {
    return new Promise<Event[]>(async (resolve, reject) => {
        // get list of event id from UserHostingEvent
        const eventIds: number[] = [];
        await database<UserHostingEvent>('UserHostingEvent')
            .select()
            .where({userId: user.id})
            .then((records) => {
                for (let i = 0; i < records.length; i++) {
                    eventIds.push(records[i].eventId);
                }
            })
            .catch((error) => {
                reject(error);
            });
        // get list of events
        const events: Event[] = [];
        await database<Event>('Events')
            .select()
            .whereIn('id', eventIds)
            .orderBy('datePosted', 'desc')
            .then((records) => {
                for (let i = 0; i < records.length; i++) {
                    events.push(records[i])
                }
            })
            .catch((error) => {
                reject(error);
            });
        resolve(events);
    });
};

export const readEventsByUserFollowers = (followers: User[]): Promise<Event[]> => {
    return new Promise<Event[]>(async (resolve, reject) => {
        const userIds: number[] = [];
        for (let i = 0; i < followers.length; i++) {
            userIds.push(followers[i].id);
        }
        const eventIds: number[] = [];
        await database<UserHostingEvent>('UserHostingEvent')
            .select()
            .whereIn('userId', userIds)
            .then((records) => {
                for (let i = 0; i < records.length; i++) {
                    eventIds.push(records[i].eventId);
                }
            })
            .catch((error) => {
                reject(error);
            });
        await database<Event>('Events')
            .select()
            .whereIn('id', eventIds)
            .orderBy('datePosted', 'desc')
            .then((records) => {
                resolve(records);
            })
            .catch((error) => {
                reject(error);
            });
    });
};