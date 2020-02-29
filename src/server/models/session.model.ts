import mongoose from 'mongoose';

// Layout of the object
const sessionSchema = new mongoose.Schema({
    email: String,
    refreshToken: String,
    accessToken: String
});

// The object itself
export const Session = mongoose.model('Session', sessionSchema);

export interface Session {
    accessToken: string;
    refreshToken: string;
}