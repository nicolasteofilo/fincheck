import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepo: CategoriesRepository) {}

  findAllByUserId(userId: string) {
    const userCategories = this.categoryRepo.findMany({
      where: {
        userId: userId,
      },
    });

    return userCategories;
  }
}
