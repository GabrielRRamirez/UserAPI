import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

/* eslint-disable prettier/prettier */
@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async save(user: UserEntity) {
    this.users.push(user);
    console.log(this.users);
  }

  async list(): Promise<UserEntity[]> {
    return this.users;
  }

  async findById(id: string): Promise<UserEntity> {
    return this.users.find(findUser => findUser.id === id);
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = this.users.find(findUser => findUser.email === email);

    return user !== undefined;
  }

  async update(id: string, updateUser: Partial<UpdateUserDto>): Promise<UserEntity> {
    const user = await this.findById(id);

    if(!user) {
      throw new Error('User not Found!');
    }

    Object.entries(updateUser).forEach(([chave, valor]) => {
      if(chave === 'id') {
        return;
      }

      user[chave] = valor;
    })

    return user;
  }

  async delete(id: string): Promise<UserEntity> {
    const user = this.findById(id);

    if(!user) {
      throw new Error('User not Found!');
    }

    this.users = this.users.filter(u => u.id !== id);

    return user;
  }
}
