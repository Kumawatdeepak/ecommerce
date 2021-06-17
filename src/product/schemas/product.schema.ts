import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
      proId: Number,
      proTitle: String,
      proDesc: String,
      catId: Number,
      proPrice: Number,
      proSalePrice: Number,
      createdAt: String,
      CreateBy: Number,
      udatedAt: String,
      UpdatedBy: Number,
})