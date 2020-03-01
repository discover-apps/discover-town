import mongoose from 'mongoose';

// Layout of the object
const sessionSchema = new mongoose.Schema({
    refreshToken: String
});

// The object itself
export const Session = mongoose.model('Session', sessionSchema);

// The object type interface
export interface Session {
    refreshToken: string;
}