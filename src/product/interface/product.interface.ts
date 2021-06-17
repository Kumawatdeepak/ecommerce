import { Document } from "mongoose";

export interface IProduct extends Document {
    readonly proId: number;
    readonly proTitle: string;
    readonly proDesc: string;
    readonly catId: number;
    readonly proPrice: number;
    readonly proSalePrice: number;
    readonly createdAt: string;
    readonly CreateBy: number;
    readonly udatedAt: string;
    readonly UpdatedBy: number;
}

