const dotenv = require('dotenv');
import fs from 'fs';

let NODE_ENV;
let NODE_PORT;
let ACCESS_TOKEN_SECRET;
let REFRESH_TOKEN_SECRET;

if (fs.existsSync(__dirname + '/.env')) {
    dotenv.config({path: __dirname + '/.env'});
    NODE_ENV = process.env.NODE_ENV;
    NODE_PORT = process.env.PORT;
    ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
} else if (fs.existsSync(__dirname + '/.env.example')) {
    console.warn('Using .example.env file to supply environmental variables.');
    dotenv.config({path: __dirname + '/.env.example'});
    NODE_PORT = process.env.PORT;
} else {
    console.error('No .env file. Create a .env file in the same directory as this file.');
    process.exit(1);
}

export const PORT = NODE_PORT;
if (!PORT) {
    console.error('Environmental Variable: PORT not found, please check .env files.');
    process.exit(1);
}

export const ENVIRONMENT = NODE_ENV;
if (!ENVIRONMENT) {
    console.error('Environmental Variable: ENVIRONMENT not found, please check .env files.');
    process.exit(1);
}

export const JWT_ACCESS_TOKEN_SECRET = ACCESS_TOKEN_SECRET;
if (!JWT_ACCESS_TOKEN_SECRET) {
    console.error('Environmental Variable: JWT_ACCESS_TOKEN_SECRET not found, please check .env files.');
    process.exit(1);
}

export const JWT_REFRESH_TOKEN_SECRET = REFRESH_TOKEN_SECRET;
if (!JWT_REFRESH_TOKEN_SECRET) {
    console.error('Environmental Variable: JWT_REFRESH_TOKEN_SECRET not found, please check .env files.');
    process.exit(1);
}