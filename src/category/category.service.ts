import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICategory } from './interface/category.interface';
import { CategoryDto } from './category.dto';


@Injectable()
export class CategoryService {
    constructor(@InjectModel('Category') private readonly categoryModel: Model<ICategory>) { }

    public async getCategories(): Promise<CategoryDto[]> {
        const categories = await this.categoryModel.find().exec()
        if (!categories || !categories[0]) {
            throw new HttpException('Category not found', 404);
        }
        return categories;
    }

    public async postCategory(newCat: CategoryDto) {
        const cat = await new this.categoryModel(newCat)
        return cat.save();
    }

    public async getCategoryById(catId: number): Promise<CategoryDto> {
        const category = await this.categoryModel.findOne({ catId }).exec();
            if (!category) {
                throw new HttpException('Not found by category id', 404);
            }
            return category;
    }

    public async deleteCategoryById(catId: number){
        const category = await this.categoryModel.deleteOne({ catId }).exec();
            if(category.deletedCount === 0){
                throw new HttpException('Not found', 404);
            }
            return category;
    }

    public async putCategoryById(
        _id: number,
        propertyName: string,
        propertyValue: string
    ): Promise<CategoryDto> {
        const category = await this.categoryModel.findByIdAndUpdate(
            { _id },
            {
                [propertyName]: propertyValue
            }
            ).exec();
            if(!category) {
                throw new HttpException('Not found', 404);
            }
            return category;
    }
}



