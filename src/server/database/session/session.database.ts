import {database} from '../_database';
import Session from "../../models/session.model";

export const createSession = async (session: Session): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        database<Session>('Sessions')
            .insert(session)
            .then((results: any) => {
                resolve(results[0]);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
};

export const readSessionById = async (sessionId: number): Promise<Session> => {
    return new Promise<Session>((resolve, reject) => {
        database<Session>('Sessions')
            .select("*")
            .where({id: sessionId})
            .first()
            .then((results: any) => {
                resolve(results);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
};

export const readSessionByRefreshToken = async (refreshToken: string): Promise<Session> => {
    return new Promise<Session>((resolve, reject) => {
        database<Session>('Sessions')
            .select("*")
            .where({refreshToken: refreshToken})
            .first()
            .then((results: any) => {
                resolve(results);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
};

export const readSessionByAccessToken = async (accessToken: string): Promise<Session> => {
    return new Promise<Session>((resolve, reject) => {
        database<Session>('Sessions')
            .select("*")
            .where({accessToken: accessToken})
            .first()
            .then((results: any) => {
                resolve(results);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
};

export const updateSession = async (sessionId: number, session: Session): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        database<Session>('Sessions')
            .update(session)
            .where({id: sessionId})
            .then((results: any) => {
                resolve(results);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
};

export const deleteSession = async (sessionId: number): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        database<Session>('Sessions')
            .delete()
            .where({id: sessionId})
            .then((results: any) => {
                resolve(results);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
};

export const deleteAllSessionsForUser = async (userId: number): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        database<Session>('Sessions')
            .delete()
            .where({userId: userId})
            .then((results: any) => {
                resolve(results);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
};