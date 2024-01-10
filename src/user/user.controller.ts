/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { v4 as uuid } from 'uuid'; 
import { UserResponseDto } from './dto/user-response.dto';

@Controller('/user')
export class UserController {

    constructor(private readonly userRepository:UserRepository){}
    
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const entity = new UserEntity(uuid(), createUserDto.name, createUserDto.email, createUserDto.password);

    this.userRepository.save(entity);
    return new UserResponseDto(entity.id, entity.email);
  }

  @Get()
  async list(): Promise<UserResponseDto[]> {
    return (await this.userRepository.list()).map(user => new UserResponseDto(user.id, user.email));
  }
}
