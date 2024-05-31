import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateBankAccountOwnershipService } from '../bank-accounts/services/validade-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../categories/services/validade-category-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validateBankAccountOwnership: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, userId: string) {
    const { name, type, value, date, categoryId, bankAccountId } = createTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      categoryId,
      bankAccountId,
    });

    return this.transactionsRepo.create({
      data: {
        name,
        type,
        date,
        value,
        bankAccountId,
        categoryId,
        userId,
      },
    });
  }

  async findAllByUserId(userId: string) {
    const transactions = await this.transactionsRepo.findMany({
      where: {
        userId,
      },
    });

    return transactions;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
  }: {
    userId: string;
    bankAccountId: string;
    categoryId: string;
  }) {
    await Promise.all([
      this.validateBankAccountOwnership.validate(userId, bankAccountId),
      this.validateCategoryOwnershipService.validate(userId, categoryId),
    ]);
  }
}
