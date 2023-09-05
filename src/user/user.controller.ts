import { Body, Controller, Get, Post } from '@nestjs/common';
import { createUserDTO } from './DTO/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './interfaces/user.entity';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService:UserService,
    ){}
    
    @Get()
    async getAllUsers():Promise<UserEntity[]>{
       return this.userService.getAllUser() 
    }

    @Post()
    async createUser(@Body() createUser:createUserDTO):Promise<UserEntity>{
        return this.userService.createUser(createUser)
    }
}
