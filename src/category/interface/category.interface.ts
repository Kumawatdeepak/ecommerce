import { Document } from "mongoose";

export interface ICategory extends Document{
    readonly catId: number;
    readonly catName: string;
    readonly catDesc: string;
} 