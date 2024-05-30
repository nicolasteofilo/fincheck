import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { ValidateBankAccountOwnershipService } from './validade-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnership: ValidateBankAccountOwnershipService,
  ) {}

  async create(createBankAccountDto: CreateBankAccountDto, userId: string) {
    const { name, type, color, initialBalance } = createBankAccountDto;

    const bankAccount = await this.bankAccountsRepo.create({
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

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepo.findMany({
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
    await this.validateBankAccountOwnership.validate(userId, bankAccountId);

    const updatedBankAccount = this.bankAccountsRepo.update({
      where: {
        id: bankAccountId,
      },
      data: updateBankAccountDto,
    });

    return updatedBankAccount;
  }

  async remove(bankAccountId: string, userId: string) {
    await this.validateBankAccountOwnership.validate(userId, bankAccountId);

    await this.bankAccountsRepo.delete({
      where: {
        id: bankAccountId,
      },
    });

    return null;
  }
}
