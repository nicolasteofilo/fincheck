import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validade-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../../categories/services/validade-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validade-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validateBankAccountOwnership: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
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

  async findAllByUserId(userId: string, filters: { month: number; year: number; bankAccontId?: number }) {
    const transactions = await this.transactionsRepo.findMany({
      where: {
        userId,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)), 
          lt: new Date(Date.UTC(filters.year, filters.month + 1)),
        }
      },
    });

    return transactions;
  }

  async update(userId: string, transactionId: string, updateTransactionDto: UpdateTransactionDto) {
    const { name, type, value, date, categoryId, bankAccountId } = updateTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      categoryId,
      bankAccountId,
      transactionId,
    });

    return this.transactionsRepo.update({
      where: {
        id: transactionId,
      },
      data: {
        name,
        type,
        date,
        value,
        bankAccountId,
        categoryId,
      },
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({
      userId,
      transactionId,
    });

    await this.transactionsRepo.delete({
      where: {
        id: transactionId,
      },
    });
  }

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId,
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
  }) {
    await Promise.all([
      transactionId && this.validateTransactionOwnershipService.validate(userId, transactionId),
      bankAccountId && this.validateBankAccountOwnership.validate(userId, bankAccountId),
      categoryId && this.validateCategoryOwnershipService.validate(userId, categoryId),
    ]);
  }
}
