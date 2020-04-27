import {deleteTestUsersFromDb, generateTestUser} from "../../util/test.util";
import User from "../../models/user.model";
import {createUser} from "../user/user.database";
import {authenticateAdmin} from "./auth.database";

describe("Test auth.database.ts", () => {
    describe("Test authenticateAdmin", () => {
        beforeEach(async () => {
            await deleteTestUsersFromDb();
        });
        afterAll(async () => {
            await deleteTestUsersFromDb();
        });

        it("Successfully verifies an admin", async done => {
            let success: boolean = false;
            // create a test user that is an admin
            const user: User = await generateTestUser(0);
            user.admin = true;
            // insert test user into database
            await createUser(user).then(async (userId: number) => {
                // attempt to verify user as an administrator
                await authenticateAdmin(userId).then(() => {
                    success = true;
                }).catch((error) => {
                    expect(error).toBeNull();
                });
            });
            expect(success).toBeTruthy();
            done();
        });

        it("Fails to verify an admin", async done => {
            let success: boolean = false;
            // create a test user that is an admin
            const user: User = await generateTestUser(0);
            // insert test user into database
            await createUser(user).then(async (userId: number) => {
                // attempt to verify user as an administrator
                await authenticateAdmin(userId).then(() => {
                    success = true;
                }).catch((error) => {
                    expect(error).toEqual("User is not an administrator.");
                });
            });
            expect(success).toBeFalsy();
            done();
        });
    });
});