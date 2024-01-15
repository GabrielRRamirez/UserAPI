import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserResponseDto } from './dto/user-response.dto';

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
}
