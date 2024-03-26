import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthenticateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
