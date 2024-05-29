import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { SigninDto } from './dto/signin';
import { SignupDto } from './dto/signup';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private jwtService: JwtService,
  ) { }

  async signin(signingDto: SigninDto) {
    const { email, password } = signingDto;

    const user = await this.usersRepo.findByEmail({
      where: {
        email,
      },
    });

    const passwordIsValid = await compare(password || '', user?.password || '');

    if (!passwordIsValid || !user) {
      throw new UnauthorizedException(['invalid credential']);
    }

    const access_token = await this.generateAccessToken(user.id);

    return {
      access_token,
    };
  }

  async signup(signupDto: SignupDto) {
    const { email, name } = signupDto;

    const emailTaken = await this.usersRepo.findByEmail({
      where: {
        email,
      },
    });

    if (emailTaken) {
      throw new ConflictException(['this email sent is in use']);
    }

    const hashedPass = await hash(signupDto.password, 8);

    const user = await this.usersRepo.create({
      data: {
        name,
        email,
        password: hashedPass,
        categories: {
          createMany: {
            data: [
              // Income
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              // Expense
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'EXPENSE' },
            ],
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const access_token = await this.generateAccessToken(user.id);

    return {
      ...user,
      access_token,
    };
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
