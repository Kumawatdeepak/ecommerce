import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    id: Number,
    username: String,
    email: String,
    password: String,
    role: String
})