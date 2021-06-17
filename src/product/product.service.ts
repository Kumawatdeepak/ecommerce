import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDto } from './product.dto'
import { IProduct } from './interface/product.interface'

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<IProduct>) { }
    
    public async getProducts(): Promise<ProductDto[]>{
        const products = await this.productModel.find().exec()
        if (!products || !products[0]) {
            throw new HttpException('Products not found', 404);
        }
        return products;
    }

    public async postProduct(newProduct: ProductDto) {
        const cat = await new this.productModel(newProduct)
        return cat.save();
    }

    public async getProductById(proId: number): Promise<ProductDto> {
        const product = await this.productModel.findOne({ proId }).exec();
            if (!product) {
                throw new HttpException('Not found by product id', 404);
            }
            return product;
        }


    public async deleteProductById(proId: number) {
        const product = await this.productModel.deleteOne({ proId }).exec();
            if(product.deletedCount === 0){
                throw new HttpException('Not found', 404);
            }
            return product;
    }
    
    public async putProductById(
        _id: number,
        propertyName: string,
        propertyValue: string
    ): Promise<ProductDto> {
        const product = await this.productModel.findByIdAndUpdate(
            { _id },
            {
                [propertyName]: propertyValue
            }
            ).exec();
            if(!product) {
                throw new HttpException('Not found', 404);
            }
            return product;
        }

}
