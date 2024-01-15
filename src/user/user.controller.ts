/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {

    constructor(
      private readonly userRepository:UserRepository,
      private readonly userService: UserService
    ){}
    
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async list(): Promise<UserResponseDto[]> {
    return await this.userService.listAll();
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() updateUser: UpdateUserDto): Promise<UserResponseDto> {
    const updatedUser = await this.userRepository.update(id, updateUser);
    
    return new UserResponseDto(updatedUser.id, updatedUser.name);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
      const deletedUser = await this.userRepository.delete(id);

      return {
        user: { id: deletedUser.id, name: deletedUser.name },
        message: 'User deleted' 
      }
  }
}
