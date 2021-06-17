import { Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './category.dto';


@Controller('category')
export class CategoryController {
    constructor(private categoryService:CategoryService){}

    @Get()
    public async getCategories(){
        return this.categoryService.getCategories();
    }

    @Post()
    public async postCategory(@Body() category:CategoryDto){
        return this.categoryService.postCategory(category);
    }

    @Get(':id')
    public async getCategoryById(@Param('id') id : number ){
        return this.categoryService.getCategoryById(id)
    }

    @Delete(':id')
    public async deleteCategoryById(@Param('id') id : number ){
        return this.categoryService.deleteCategoryById(id)
    }

    @Put(':id')
    public async putCategoryById(@Param('id') id:number, @Query() query){
        const propertyName = query.property_name;
        const propertyValue = query.property_value;
        return this.categoryService.putCategoryById(id, propertyName, propertyValue)
    }
}
