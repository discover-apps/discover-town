import {
    createSession,
    deleteAllSessionsForUser,
    deleteSession,
    readSessionByAccessToken,
    readSessionById,
    readSessionByRefreshToken,
    updateSession
} from "./session.database";
import Session from "../../models/session.model";
import {testSession, testUser} from "../../models/_testModels.model";
import {createUser, deleteUser} from "../user/user.database";

beforeAll(async () => {
    // create testUser
    testUser.id = await createUser(testUser);
    // update our test session's id
    testSession.userId = testUser.id;
});

afterAll(async () => {
    // delete testUser
    const rowsAffected = await deleteUser(testUser.id);
});

describe('session.database.spec.ts', () => {
    it('Inserts a session record and returns the record id', async done => {
        createSession(testSession).then((sessionId: number) => {
            expect(sessionId).not.toBeNull();
            expect(sessionId).toBeGreaterThan(-1);
            // update our test object's id
            testSession.id = sessionId;
            done();
        });
    });

    it('Reads a session using a session id, returns session object', async done => {
        readSessionById(testSession.id).then((session: Session) => {
            expect(session).not.toBeNull();
            expect(session).toEqual(testSession);
            done();
        });
    });

    it('Reads a session using refreshToken, returns session object', async done => {
        readSessionByRefreshToken(testSession.refreshToken).then((session: Session) => {
            expect(session).not.toBeNull();
            expect(session).toEqual(testSession);
            done();
        });
    });

    it('Reads a session using accessToken, returns session object', async done => {
        readSessionByAccessToken(testSession.accessToken).then((session: Session) => {
            expect(session).not.toBeNull();
            expect(session).toEqual(testSession);
            done();
        });
    });

    it('Reads a session that does not exist, returns undefined', async done => {
        await readSessionById(-150).then((session: Session) => {
            expect(session).toBe(undefined);
        });
        await readSessionByAccessToken("not_existing_access_token").then((session: Session) => {
            expect(session).toBe(undefined);
        });
        await readSessionByRefreshToken("not_existing_refresh_token").then((session: Session) => {
            expect(session).toBe(undefined);
        });
        done();
    });

    it('Updates a session record for a given [id, session] combination', async done => {
        testSession.accessToken = "updated_accessTokenTest";
        updateSession(testSession.id, testSession).then((rowsAffected: number) => {
            expect(rowsAffected).not.toBeNull();
            expect(rowsAffected).toEqual(1);
            done();
        });
    });

    it('Deletes a session record by session id', async done => {
        deleteSession(testSession.id).then((rowsAffected: number) => {
            expect(rowsAffected).not.toBeNull();
            expect(rowsAffected).toEqual(1);
            done();
        });
    });

    it('Deletes all session records by user id', async done => {
        testSession.id = undefined;
        testSession.accessToken = "updated_accessTokenTest1";
        testSession.refreshToken = "updated_refreshTokenTest1";
        await createSession(testSession);
        testSession.accessToken = "updated_accessTokenTest2";
        testSession.refreshToken = "updated_refreshTokenTest2";
        await createSession(testSession);
        deleteAllSessionsForUser(testUser.id).then((rowsAffected: number) => {
            expect(rowsAffected).not.toBeNull();
            expect(rowsAffected).toEqual(2);
            done();
        })
    })
});