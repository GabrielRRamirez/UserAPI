import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

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
}
