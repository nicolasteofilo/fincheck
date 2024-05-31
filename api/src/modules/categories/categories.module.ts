import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { ValidateCategoryOwnershipService } from './services/validade-category-ownership.service';
import { CategoriesController } from './categories.controller';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, ValidateCategoryOwnershipService],
  exports: [ValidateCategoryOwnershipService],
})
export class CategoriesModule {}
