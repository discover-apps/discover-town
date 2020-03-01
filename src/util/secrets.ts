import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync(__dirname + '/.env')) {
    console.log('Using .env file to supply config environment variables');
    dotenv.config({path: __dirname + '/.env'});
} else if (fs.existsSync(__dirname + '/.env.example')) {
    console.warn('Using .example.env file to supply environmental variables.');
    dotenv.config({path: __dirname + '/.env.example'});
} else {
    console.error('No .env file. Create a .env file in the same directory as this file.');
    process.exit(1);
}

export const PORT = process.env.PORT;
if (!PORT) {
    console.error('Environmental Variable: PORT not found, please check .env files.');
    process.exit(1);
}

export const ENVIRONMENT = process.env.ENVIRONMENT || "development";
if (!ENVIRONMENT) {
    console.error('Environmental Variable: ENVIRONMENT not found, please check .env files.');
    process.exit(1);
}

export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
if (!JWT_ACCESS_TOKEN_SECRET) {
    console.error('Environmental Variable: JWT_ACCESS_TOKEN_SECRET not found, please check .env files.');
    process.exit(1);
}

export const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
if (!JWT_REFRESH_TOKEN_SECRET) {
    console.error('Environmental Variable: JWT_REFRESH_TOKEN_SECRET not found, please check .env files.');
    process.exit(1);
}