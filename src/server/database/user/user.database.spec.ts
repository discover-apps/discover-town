import User from "../../models/user.model";
import {createUser, deleteUser, readUserByEmail, readUserById, readUserByUsername, updateUser} from "./user.database";
import {testUser} from "../../models/_testModels.model";

describe('user.database.spec.ts', () => {
    it('Inserts a user record and returns the record id', async done => {
        createUser(testUser).then((userId: number) => {
            expect(userId).not.toBeNull();
            expect(userId).toBeGreaterThan(-1);
            // update our test object's id
            testUser.id = userId;
            done();
        });
    });

    it('Fails to insert user with duplicate information', async done => {
        let tempUser = {...testUser};
        tempUser.id = undefined;
        await createUser(tempUser).then((userId: number) => {
            // should fail
        }).catch((error: any) => {
            expect(error).not.toBeNull();
            expect(error).toEqual('A user with that username already exists.');
        });
        tempUser = {...testUser};
        tempUser.id = undefined;
        tempUser.username = "testUsernameNotDuplicate";
        await createUser(tempUser).then((userId: number) => {
            // should fail
        }).catch((error: any) => {
            expect(error).not.toBeNull();
            expect(error).toEqual('A user with that email address already exists.');
        });
        done();
    });

    it('Reads a user using a user id, returns user object', async done => {
        readUserById(testUser.id).then((user: User) => {
            expect(user).not.toBeNull();
            // set joined to testValue (time issues)
            user.joined = testUser.joined;
            expect(user).toEqual(testUser);
            done();
        });
    });

    it('Reads a user using a username, returns user object', async done => {
        readUserByUsername(testUser.username).then((user: User) => {
            expect(user).not.toBeNull();
            // set joined to testValue (time issues)
            user.joined = testUser.joined;
            expect(user).toEqual(testUser);
            done();
        });
    });

    it('Reads a user using a email, returns user object', async done => {
        readUserByEmail(testUser.email).then((user: User) => {
            expect(user).not.toBeNull();
            // set joined to testValue (time issues)
            user.joined = testUser.joined;
            expect(user).toEqual(testUser);
            done();
        });
    });

    it('Updates a user record for a given [id, user] combination', async done => {
        testUser.username = "updated_username";
        updateUser(testUser.id, testUser).then((rowsAffected: number) => {
            expect(rowsAffected).not.toBeNull();
            expect(rowsAffected).toEqual(1);
            done();
        });
    });

    it('Fails to update a user record when given duplicate information', async done => {
        // create a new temp user
        let tempUser = {...testUser};
        tempUser.id = undefined;
        tempUser.username = "testTempUsername";
        tempUser.email = "testTempEmail@gmail.com";
        tempUser.name = "test_temp_name";
        tempUser.password = "test_temp_password_123";
        // insert temp user into database
        const tempUserId = await createUser(tempUser);
        // update test user record
        await updateUser(testUser.id, tempUser).then((rowsAffected: number) => {
            // should fail
        }).catch((error: any) => {
            expect(error).not.toBeNull();
            expect(error).toEqual('A user with that username already exists.');
        });
        tempUser.username = "testUsernameNotDuplicate";
        await updateUser(testUser.id, tempUser).then((rowsAffected: number) => {
            // should fail
        }).catch((error: any) => {
            expect(error).not.toBeNull();
            expect(error).toEqual('A user with that email address already exists.');
        });
        // delete temp user from database
        const rowsEffected = await deleteUser(tempUserId);
        done();
    });

    it('Deletes a user record by user id', async done => {
        deleteUser(testUser.id).then((rowsAffected: number) => {
            expect(rowsAffected).not.toBeNull();
            expect(rowsAffected).toEqual(1);
            done();
        });
    });
});