import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(
    bankAccountId: string,
    userId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnership(userId, bankAccountId);

    const updatedBankAccount = this.bankAccountsRepo.update({
      where: {
        id: bankAccountId,
      },
      data: updateBankAccountDto,
    });

    return updatedBankAccount;
  }

  async remove(bankAccountId: string, userId: string) {
    await this.validateBankAccountOwnership(userId, bankAccountId);

    await this.bankAccountsRepo.delete({
      where: {
        id: bankAccountId,
      },
    });

    return null;
  }

  private async validateBankAccountOwnership(
    userId: string,
    bankAccountId: string,
  ): Promise<null> {
    const isOwner = await this.bankAccountsRepo.findFirst({
      where: {
        userId,
        id: bankAccountId,
      },
    });

    if (!isOwner) {
      throw new NotFoundException(['bank account not found']);
    }

    return null;
  }
}
