import {Request, Response} from "express";
import {readUserById, readUserFollowers} from "../../database/user/user.database";
import Event from "../../models/event.model";
import User from "../../models/user.model";
import {
    createEvent,
    createEventAttendee,
    deleteEvent,
    deleteEventAttendee,
    readAttendingByUser,
    readEventAttendees,
    readEventById,
    readEvents,
    readEventsByUser,
    readEventsByUserFollowers,
    updateEvent,
    userAttendingEvent
} from "../../database/event/event.database";
import {searchNearbyPlaces} from "../../api/googlePlace.api";
import {GooglePlace} from "../../models/googlePlace.model";
import {authenticateAdmin} from "../../database/auth/auth.database";

export const searchPlaces = async (req: Request, res: Response) => {
    const query = req.body.query;
    searchNearbyPlaces(query, -1).then((places: GooglePlace[]) => {
        return res.status(200).json(places);
    }).catch((error) => {
        return res.status(500).json(error);
    });
};

export const create = async (req: Request, res: Response) => {
    // get user id from req
    const userId = Number.parseInt(req.user.toString());
    // get event object from body
    const event: Event = req.body;
    createEvent(event, userId).then((eventId: number) => {
        event.id = eventId;
        res.status(200).json(event);
    }).catch((error) => {
        res.status(500).json(error);
    });
};

export const update = async (req: Request, res: Response) => {
    // get user id from body
    const userId = Number.parseInt(req.user.toString());
    // get event object from body
    const event: Event = req.body.event;
    updateEvent(event, userId).then((message: string) => {
        res.status(200).json(message);
    }).catch((error) => {
        res.status(500).json(error);
    });
};

export const remove = async (req: Request, res: Response) => {
    // validate user owns this event
    const userId = Number.parseInt(req.user.toString());
    // get event object from body
    const event: Event = req.body.event;
    deleteEvent(event, userId).then((message: string) => {
        res.status(200).json(message);
    }).catch((error) => {
        res.status(500).json(error);
    });
};

export const read = async (req: Request, res: Response) => {
    authenticateAdmin(Number.parseInt(req.user.toString())).then(() => {
        readEvents().then((events: Event[]) => {
            res.status(200).json(events);
        }).catch((error) => {
            res.status(300).json(error);
        });
    }).catch((error: any) => {
        res.status(300).json(error);
    });
};

export const readById = async (req: Request, res: Response) => {
    // get event id from req body
    const eventId: number = req.body.eventId;
    readEventById(eventId).then((event: Event) => {
        res.status(200).json(event);
    }).catch((error) => {
        res.status(300).json(error);
    });
};

export const readByUser = async (req: Request, res: Response) => {
    // get user from req body
    const user: User = req.body;
    readEventsByUser(user).then((events: Event[]) => {
        res.status(200).json(events);
    }).catch((error) => {
        res.status(300).json(error);
    });
};

export const readByFollowers = async (req: Request, res: Response) => {
    // get user id from req user
    const userId = Number.parseInt(req.user.toString());
    const user = await readUserById(userId);
    readUserFollowers(user.username).then((followers: User[]) => {
        readEventsByUserFollowers(followers).then((events: Event[]) => {
            res.status(200).json(events);
        }).catch((error) => {
            res.status(500).json(error);
        });
    }).catch((error) => {
        res.status(500).json(error);
    });
};

export const readAttendees = async (req: Request, res: Response) => {
    const event: Event = req.body.event;
    readEventAttendees(event).then((user: User[]) => {
        res.status(200).json(user);
    }).catch((error) => {
        res.status(500).json(error);
    });
};

export const readAttending = async (req: Request, res: Response) => {
    const user: User = req.body.user;
    readAttendingByUser(user).then((events: Event[]) => {
        res.status(200).json(events);
    }).catch((error) => {
        res.status(500).json(error);
    });
};

export const createAttendee = async (req: Request, res: Response) => {
    // get user id from req user
    const userId = Number.parseInt(req.user.toString());
    const user = await readUserById(userId);
    // get event from req body
    const event: Event = req.body.event;
    createEventAttendee(event, user).then((message: string) => {
        res.status(200).json(message);
    }).catch((error) => {
        res.status(500).json(error);
    });
};

export const deleteAttendee = async (req: Request, res: Response) => {
    // get user id from req user
    const userId = Number.parseInt(req.user.toString());
    const user = await readUserById(userId);
    // get event from req body
    const event: Event = req.body.event;
    deleteEventAttendee(event, user).then((message: string) => {
        res.status(200).json(message);
    }).catch((error) => {
        res.status(500).json(error);
    });
};

export const attendingEvent = async (req: Request, res: Response) => {
    // get user id from req user
    const userId = Number.parseInt(req.user.toString());
    const user = await readUserById(userId);
    // get event from req body
    const event: Event = req.body.event;
    userAttendingEvent(event, user).then((attending: boolean) => {
        res.status(200).json(attending);
    }).catch((error) => {
        res.status(500).json(error);
    });
};