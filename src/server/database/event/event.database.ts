import axios, {AxiosResponse} from 'axios';
import User from "../../models/user.model";
import Event, {EventLocation, UserAttendingEvent, UserHostingEvent} from "../../models/event.model";
import {database} from "../_database";
import {readUserById} from "../user/user.database";
import {GOOGLE_MAPS_API_KEY} from "../../../util/secrets";

export const createEvent = (event: Event, userId: number): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        validateEvent(event).then((event: Event) => {
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
        })
    });
};

export const updateEvent = (event: Event): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        validateEvent(event).then((event) => {
            // update record in event table
            database<Event>('Events')
                .update(event)
                .where({id: event.id})
                .then((records: any) => {
                    resolve("Successfully updated event.");
                })
                .catch((error) => {
                    reject(error);
                });
        }).catch((error) => {
            reject(error);
        })
    });
};

export const deleteEvent = (event: Event): Promise<string> => {
    return new Promise<string>(async (resolve, reject) => {
        // delete all records from UserHostingEvent table
        await database<UserHostingEvent>('UserHostingEvent')
            .delete()
            .where('eventId', event.id)
            .catch((error) => {
                return reject(error);
            });
        // delete all records from UserAttendingEvent table
        await database<UserAttendingEvent>('UserAttendingEvent')
            .delete()
            .where('eventId', event.id)
            .catch((error) => {
                return reject(error);
            });
        // delete all records from Events table
        await database<Event>('Events')
            .delete()
            .where({id: event.id})
            .catch((error) => {
                return reject(error);
            });
        return resolve("Successfully deleted event.");
    });
};

const validateEvent = (event: Event): Promise<Event> => {
    return new Promise<Event>((resolve, reject) => {
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
        validateLocation(event.address_location).then((location: EventLocation) => {
            // update event location to validated address
            event.address_location = location.formatted_address;
            event.lat = location.lat;
            event.lon = location.lon;
            resolve(event);
        }).catch((error) => {
            reject(error);
        });
    });
};

const validateLocation = (address: string): Promise<EventLocation> => {
    return new Promise<EventLocation>((resolve, reject) => {
        const url: string = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${GOOGLE_MAPS_API_KEY}`;
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
        // get list of event
        const events: Event[] = [];
        await database<Event>('Events')
            .select()
            .whereIn('id', eventIds)
            .orderBy('datePosted', 'desc')
            .then((records) => {
                for (let i = 0; i < records.length; i++) {
                    events.push(records[i]);
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

export const createEventAttendee = (event: Event, user: User): Promise<string> => {
    return new Promise<string>(async (resolve, reject) => {
        await database<UserAttendingEvent>('UserAttendingEvent')
            .insert({userId: user.id, eventId: event.id})
            .then((record) => {
                resolve('Successfully added event attendee.');
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const deleteEventAttendee = (event: Event, user: User): Promise<string> => {
    return new Promise<string>(async (resolve, reject) => {
        await database<UserAttendingEvent>('UserAttendingEvent')
            .delete()
            .where({eventId: event.id, userId: user.id})
            .then((record) => {
                resolve('Successfully removed event attendee.');
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const readEventAttendees = (event: Event): Promise<User[]> => {
    return new Promise<User[]>((resolve, reject) => {
        database<UserAttendingEvent>('UserAttendingEvent')
            .select()
            .where({eventId: event.id})
            .then(async (results) => {
                const users: User[] = [];
                for (let i = 0; i < results.length; i++) {
                    const user: User = await readUserById(results[i].userId);
                    users.push(user);
                }
                resolve(users);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const userAttendingEvent = (event: Event, user: User): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        database<UserAttendingEvent>('UserAttendingEvent')
            .select()
            .where({eventId: event.id, userId: user.id})
            .then((results) => {
                if (results.length > 0 && results[0].userId == user.id) {
                    resolve(true);
                }
                resolve(false);
            })
            .catch((error) => {
                reject(error);
            });
    });
};