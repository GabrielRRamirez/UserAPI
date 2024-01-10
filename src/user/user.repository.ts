import { Injectable } from '@nestjs/common';

/* eslint-disable prettier/prettier */
@Injectable()
export class UserRepository {
  private users = [];

  async save(user) {
    this.users.push(user);
    console.log(this.users);
  }

  async list() {
    return this.users;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = this.users.find(findUser => findUser.email === email);

    return user !== undefined;
  }
}
