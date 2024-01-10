import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { IsUniqueEmail } from '../validators/email.validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsUniqueEmail({ message: 'Email already exists' })
  @IsOptional()
  email: string;

  @MinLength(8)
  @IsOptional()
  password: string;
}
