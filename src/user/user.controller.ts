/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Controller('/user')
export class UserController {

    constructor(private readonly userRepository:UserRepository){}
    
  @Post()
  async create(@Body() user): Promise<string> {
    this.userRepository.save(user);
    return user;
  }
}
