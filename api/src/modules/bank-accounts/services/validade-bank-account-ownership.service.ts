import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class ValidateBankAccountOwnershipService {
  constructor(private readonly bankAccountsRepo: BankAccountsRepository) {}

  async validate(userId: string, bankAccountId: string): Promise<null> {
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
