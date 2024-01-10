/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { v4 as uuid } from 'uuid'; 
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/user')
export class UserController {

    constructor(private readonly userRepository:UserRepository){}
    
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const entity = new UserEntity();
    entity.id = uuid();
    entity.name = createUserDto.name;
    entity.email = createUserDto.email;
    entity.password = createUserDto.password;

    this.userRepository.save(entity);
    return new UserResponseDto(entity.id, entity.name);
  }

  @Get()
  async list(): Promise<UserResponseDto[]> {
    return (await this.userRepository.list()).map(user => new UserResponseDto(user.id, user.name));
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateUser: UpdateUserDto): Promise<UserResponseDto> {
    const updatedUser = await this.userRepository.update(id, updateUser);
    
    return new UserResponseDto(updatedUser.id, updatedUser.name);
  }
}
