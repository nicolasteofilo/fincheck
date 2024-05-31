import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './services/transactions.service';
import { ActiveUserId } from 'src/shared/decorators/activeUserId';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto, @ActiveUserId() userId: string) {
    return this.transactionsService.create(createTransactionDto, userId);
  }

  @Get()
  findAll(
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
    @ActiveUserId() userId: string
  ) {
    return this.transactionsService.findAllByUserId(userId, { month, year });
  }

  @Put(':transactionId')
  update(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(userId, transactionId, updateTransactionDto);
  }

  @Delete(':transactionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@ActiveUserId() userId: string, @Param('transactionId', ParseUUIDPipe) transactionId: string) {
    return this.transactionsService.remove(userId, transactionId);
  }
}
