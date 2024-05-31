import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.TransactionCreateArgs) {
    return this.prismaService.transaction.create(createDto);
  }

  async update(updateDto: Prisma.TransactionUpdateArgs) {
    return this.prismaService.transaction.update(updateDto);
  }

  async findMany(findManyDto: Prisma.TransactionFindManyArgs) {
    return this.prismaService.transaction.findMany(findManyDto);
  }

  async findFirst(findFirstDto: Prisma.TransactionFindFirstArgs) {
    return this.prismaService.transaction.findFirst(findFirstDto);
  }

  async delete(removeDto: Prisma.TransactionDeleteArgs) {
    return this.prismaService.transaction.delete(removeDto);
  }
}
