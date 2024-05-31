import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { ActiveUserId } from 'src/shared/decorators/activeUserId';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.categoriesService.findAllByUserId(userId);
  }
}
