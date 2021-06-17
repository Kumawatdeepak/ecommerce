import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interface/user.interface';
import { UserDto } from './user.dto';
@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel : Model<IUser>){}

    public async getUsers(): Promise<UserDto[]> {
        const users = await this.userModel.find().exec();
        if(!users || !users[0]){
            throw new HttpException ('User not found', 404);
        }
        return users;
    }

    public async postUser(userData): Promise<UserDto> {
      const user = await new this.userModel(userData);
      return user.save();
     
    }

    public async loginUser(email: string): Promise<UserDto>{
        return this.userModel.findOne({ email }).exec();        
    }
}
