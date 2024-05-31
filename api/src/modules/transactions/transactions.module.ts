import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { ValidateTransactionOwnershipService } from './services/validade-transaction-ownership.service';
import { TransactionsController } from './transactions.controller';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, ValidateTransactionOwnershipService],
  imports: [BankAccountsModule, CategoriesModule],
})
export class TransactionsModule {}
