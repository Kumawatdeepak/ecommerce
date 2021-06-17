import { HttpException, Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service'
import { UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
    constructor(@InjectModel('User')
        private userService:UserService,
        private jwtService:JwtService
        ){}

       
    // get all users api
    @Get()
    public async getUsers(){
        return await this.userService.getUsers();
    }

    //save user api
    @Post('/save')
    public async postUser(@Body() user:UserDto){
        const saltOrRounds = 12;
        const{ id, username, email, password, role} = user
        const hashpassword = await bcrypt.hash(password, saltOrRounds);
        return await this.userService.postUser({id, username, email, password:hashpassword, role});
    }
    


    //login user api
    @Post('/login')
    public async loginUser(@Body() user:UserDto){
        const{ email, password } = user
        const userinfo =  await this.userService.loginUser(email);
        if(!userinfo){
            throw new HttpException('Invalid Credential ', 404);
        }
        if(!await bcrypt.compare(password, userinfo.password)){
            throw new HttpException('Invalid Password', 404);
        }
        // const jwt  = await this.jwtService.signAsync(payload: {id:userinfo.id})
        // return jwt;

        const payload = { id: userinfo.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }

}
