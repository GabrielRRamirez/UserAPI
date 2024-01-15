import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserResponseDto } from './dto/user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async listAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map((u) => new UserResponseDto(u.id, u.name));
  }

  async create(createUser: CreateUserDto): Promise<UserResponseDto> {
    const userEntity: UserEntity = Object.assign(new UserEntity(), createUser);
    await this.userRepository.save(userEntity);
    return new UserResponseDto(userEntity.id, userEntity.name);
  }
}
