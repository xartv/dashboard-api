import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsString({ message: 'Ivalid password' })
  password: string;

  @IsString({ message: 'Ivalid name' })
  name: string;
}
