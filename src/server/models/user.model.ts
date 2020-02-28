import mongoose from 'mongoose';

// Layout of the object
const userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    email: String,
    password: String
});

// The object itself
export const User = mongoose.model('User', userSchema);

// The object type interface
export interface User {
    _id: String,
    email: String,
    password: String
}