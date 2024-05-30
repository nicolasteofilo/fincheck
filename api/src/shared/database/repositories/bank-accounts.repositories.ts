import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.BankAccountCreateArgs) {
    return this.prismaService.bankAccount.create(createDto);
  }

  async update(updateDto: Prisma.BankAccountUpdateArgs) {
    return this.prismaService.bankAccount.update(updateDto);
  }

  async findMany(findManyDto: Prisma.BankAccountFindManyArgs) {
    return this.prismaService.bankAccount.findMany(findManyDto);
  }

  async findFirst(findFirstDto: Prisma.BankAccountFindFirstArgs) {
    return this.prismaService.bankAccount.findFirst(findFirstDto);
  }

  async delete(removeDto: Prisma.BankAccountDeleteArgs) {
    return this.prismaService.bankAccount.delete(removeDto);
  }
}
