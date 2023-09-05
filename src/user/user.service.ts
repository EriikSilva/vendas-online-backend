import { Injectable } from '@nestjs/common';
import { createUserDTO } from './DTO/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
 
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ){}

  private user: UserEntity[] = [];

  async createUser(createdUser: createUserDTO): Promise<UserEntity> {

    const saltOrRound = 10;
    const passwordHash = await bcrypt.hash(createdUser.password, saltOrRound);

    return this.userRepository.save({
        ...createdUser,
        typeUser: 1,
        password:passwordHash
    })
  }

  async getAllUser(): Promise<UserEntity[]>{
    return this.userRepository.find();
  }
}
