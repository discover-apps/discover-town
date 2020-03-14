import User from "../../models/user.model";
import {
    addUserFollower,
    createUser,
    deleteUser,
    getUserFollowers,
    readUserByEmail,
    readUserById,
    readUserByUsername,
    removeUserFollower,
    updateUser,
    userFollowsUser
} from "./user.database";
import {addTestUserToDb, deleteTestUserFromDb, deleteTestUsersFromDb, testUser} from "../../util/test.util";

afterAll(async () => {
    await deleteTestUserFromDb();
});

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
        tempUser.username = "notDuplicate";
        await createUser(tempUser).then((userId: number) => {
            // should fail
        }).catch((error: any) => {
            expect(error).not.toBeNull();
            expect(error).toEqual('A user with that email address already exists.');
        });
        done();
    });

    it('Fails to insert user with invalid username', async done => {
        // invalid character ' '
        await createUser({...testUser, username: 'Invalid Username'}).then(() => {
            // should fail
        }).catch((error: any) => {
            expect(error).not.toBeNull();
            expect(error).toEqual('Username should not contain any special characters.');
        });
        // length too short
        await createUser({...testUser, username: 'asd'}).then(() => {
            // should fail
        }).catch((error: any) => {
            expect(error).not.toBeNull();
            expect(error).toEqual('Username should be between 4 and 16 characters.');
        });
        // length too long
        await createUser({...testUser, username: 'Invalid_Username1'}).then(() => {
            // should fail
        }).catch((error: any) => {
            expect(error).not.toBeNull();
            expect(error).toEqual('Username should be between 4 and 16 characters.');
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
        tempUser.username = "notDuplicate";
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

    it('Fails to updated user with invalid username', async done => {
        // get user record
        const user = await readUserByUsername(testUser.username);
        // invalid character ' '
        await updateUser(user.id, {...testUser, username: 'New Username'}).then(() => {
            // should fail
        }).catch((error: any) => {
            expect(error).not.toBeNull();
            expect(error).toEqual('Username should not contain any special characters.');
        });
        // length too short
        await updateUser(user.id, {...testUser, username: 'New'}).then(() => {
            // should fail
        }).catch((error: any) => {
            expect(error).not.toBeNull();
            expect(error).toEqual('Username should be between 4 and 16 characters.');
        });
        // length too long
        await updateUser(user.id, {...testUser, username: 'New_Username_Too_Long'}).then(() => {
            // should fail
        }).catch((error: any) => {
            expect(error).not.toBeNull();
            expect(error).toEqual('Username should be between 4 and 16 characters.');
        });
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

describe('Tests UserFollowsUser database', () => {
    let user1: User = undefined;
    let user2: User = undefined;
    beforeEach(async () => {
        user1 = await addTestUserToDb(1);
        user2 = await addTestUserToDb(2);
    });
    afterEach(async () => {
        await deleteTestUsersFromDb();
    });
    it('User2 follows User1', async done => {
        await addUserFollower(user1.username, user2.username).then((result) => {
            expect(result).not.toBeNull();
        });
        done();
    });
    it('Gets User1 followers', async done => {
        await addUserFollower(user1.username, user2.username);
        await getUserFollowers(user1.username).then((users: User[]) => {
            expect(users).not.toBeNull();
            expect(users.length).toEqual(1);
            expect(users[0].username).toEqual(user2.username);
        });
        done();
    });
    it('Verifies that User2 follows User1', async done => {
        await addUserFollower(user1.username, user2.username);
        await userFollowsUser(user2.username, user1.username).then((result: boolean) => {
            expect(result).not.toBeNull();
            expect(result).toEqual(true);
        });
        done();
    });
    it('Verifies that User2 does not follow User1', async done => {
        await userFollowsUser(user2.username, user1.username).then((result: boolean) => {
            expect(result).not.toBeNull();
            expect(result).toEqual(false);
        });
        done();
    });
    it('User2 un-follows User1', async done => {
        await addUserFollower(user1.username, user2.username);
        await getUserFollowers(user1.username).then((users: User[]) => {
            expect(users).not.toBeNull();
            expect(users.length).toEqual(1);
        });
        await removeUserFollower(user1.username, user2.username).then((result: string) => {
            expect(result).not.toBeNull();
            expect(result).toEqual('Successfully un-followed user.');
        });
        await getUserFollowers(user1.username).then((users: User[]) => {
            expect(users).not.toBeNull();
            expect(users.length).toEqual(0);
        });
        done();
    });
    it('User2 fails to follow User1, because User2 already follows User1', async done => {
        await addUserFollower(user1.username, user2.username);
        await addUserFollower(user1.username, user2.username)
            .catch((error: any) => {
                expect(error).toEqual('User already follows that user.');
            });
        done();
    });
    it('Fails to get followers of a non-existing User', async done => {
        await getUserFollowers('non existing')
            .catch((error: any) => {
                expect(error).not.toBeNull();
                expect(error).toEqual('Failed to get followers for a user that does not exist.');
            });
        done();
    });
});