import { Document } from "mongoose";

export interface IUser extends Document{
    readonly id: number;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly role: string;
}