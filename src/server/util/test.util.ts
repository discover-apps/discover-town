import {deleteUser, readUserByEmail} from "../database/user/user.database";
import {deleteAllSessionsForUser} from "../database/session/session.database";
import {testUser, testUserUpdated} from "../models/_testModels.model";
import {registerUser} from "../controllers/auth/auth.controller";
import Session from "../models/session.model";

export const deleteTestUserFromDb = async () => {
    // get testUser id
    const testUserId = await readUserByEmail(testUser.email);
    if (testUserId) {
        await deleteAllSessionsForUser(testUserId.id);
        // delete user record from database
        await deleteUser(testUserId.id);
    }

    // get testUserUpdated id
    const testUserUpdateId = await readUserByEmail(testUserUpdated.email);
    if (testUserUpdateId) {
        await deleteAllSessionsForUser(testUserUpdateId.id);
        // delete user record from database
        await deleteUser(testUserUpdateId.id);
    }
};

export const registerTestUserToDb = async (): Promise<Session> => {
    return await registerUser(testUser, "test", "test");
};