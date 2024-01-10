/* eslint-disable @typescript-eslint/ban-types */
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint()
export class EmailValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(value: any): Promise<boolean> {
    const emailExists: boolean = await this.userRepository.existsByEmail(value);
    return !emailExists;
  }
}

export const IsUniqueEmail = (validationOptions?: ValidationOptions) => {
  return (obj: Object, prop: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: prop,
      options: validationOptions,
      constraints: [],
      validator: EmailValidator,
    });
  };
};
