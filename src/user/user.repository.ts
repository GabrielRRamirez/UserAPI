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

  async existsByEmail(email: string): Promise<boolean> {
    const user = this.users.find(findUser => findUser.email === email);

    return user !== undefined;
  }

  async update(id: string, updateUser: Partial<UpdateUserDto>): Promise<UserEntity> {
    const user = this.users.find(findUser => findUser.id === id);

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
}
