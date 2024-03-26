import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.UserCreateArgs) {
    return this.prismaService.user.create(createDto);
  }

  async findByEmail(findByEmailDto: Prisma.UserFindUniqueArgs) {
    return this.prismaService.user.findUnique(findByEmailDto);
  }
}
