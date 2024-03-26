import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { AuthenticateUserDto } from './dto/authenticate.dto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async authenticate(authenticateUserDto: AuthenticateUserDto) {
    const { email, password } = authenticateUserDto;

    const user = await this.usersRepo.findByEmail({
      where: {
        email,
      },
    });

    const passwordIsValid = await compare(password || '', user?.password || '');

    if (!passwordIsValid || !user) {
      throw new UnauthorizedException(['invalid credential']);
    }

    const payload = { sub: user.id, name: user.name, email: user.email };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
    };
  }
}
