import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class BankAccountsService {
  constructor(private readonly bankAccountsRepo: BankAccountsRepository) {}

  create(createBankAccountDto: CreateBankAccountDto, userId: string) {
    const { name, type, color, initialBalance } = createBankAccountDto;

    const bankAccount = this.bankAccountsRepo.create({
      data: {
        name,
        type,
        color,
        initialBalance,
        userId,
      },
    });

    return bankAccount;
  }

  findAllByUserId(userId: string) {
    const bankAccounts = this.bankAccountsRepo.findMany({
      where: {
        userId,
      },
    });
    return bankAccounts;
  }

  findOne(id: number) {
    return `This action returns a #${id} bankAccount`;
  }

  update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
    return `This action updates a #${id} bankAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} bankAccount`;
  }
}
