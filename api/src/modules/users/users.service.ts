import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) { }

  async getUserById(userId: string) {
    const user = await this.usersRepo.findById({
      where: {
        id: userId
      }
    })

    return user;
  }
}
