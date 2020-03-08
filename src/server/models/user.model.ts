import mongoose from 'mongoose';

// Layout of the object
const userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    email: String,
    password: String
});

// The object itself
export const User = mongoose.model('User', userSchema);

// The object type interface
export interface User {
    _id: String,
    name: String,
    email: String,
    password: String
}

// Object used for user register form
export interface RegisterUser {
    name: string;
    email: string;
    password: string;
    confirm: string;
}