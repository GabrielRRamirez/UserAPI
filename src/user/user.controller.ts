/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/user')
export class UserController {

    constructor(private readonly userRepository:UserRepository){}
    
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    this.userRepository.save(createUserDto);
    return createUserDto;
  }

  @Get()
  async list(): Promise<any> {
    return this.userRepository.list();
  }
}
