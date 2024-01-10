import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsUniqueEmail } from '../validators/email.validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsUniqueEmail({ message: 'Email already exists' })
  email: string;

  @MinLength(8)
  password: string;
}
