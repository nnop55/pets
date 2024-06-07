import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string) {
    const user = await this.usersRepository.findOneBy({
      email: email as string,
    });

    return user;
  }

  async updateUserToken(email: string, accessToken: string): Promise<void> {
    await this.usersRepository.update({ email }, { accessToken });
  }
}
