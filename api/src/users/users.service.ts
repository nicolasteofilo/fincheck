import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const emailTaken = await this.prismaService.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (emailTaken) {
      throw new ConflictException('this email sent is in use');
    }

    const hashedPass = await hash(createUserDto.password, 8);

    const user = await this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPass,
      },
    });

    return user;
  }
}
