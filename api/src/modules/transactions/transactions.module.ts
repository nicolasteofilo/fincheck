import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [BankAccountsModule, CategoriesModule],
})
export class TransactionsModule {}
