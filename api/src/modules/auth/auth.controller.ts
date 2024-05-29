import { Body, Controller, Post, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin';
import { SignupDto } from './dto/signup';
import { IsPublic } from 'src/shared/decorators/isPublic';

@Controller('auth')
@IsPublic()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @Post('/signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
