import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
     catId: Number,
     catName: String,
     catDesc: String
}) 