import mongoose from 'mongoose';

// Layout of the object
const sessionSchema = new mongoose.Schema({
    email: String,
    accessToken: String,
    refreshToken: String,
    ipAddress: Object,
    userAgent: Object
});

// The object itself
export const Session = mongoose.model('Session', sessionSchema);

// The object type interface
export interface Session {
    accessToken: string;
    refreshToken: string;
    ipAddress: Object;
    userAgent: Object;
}