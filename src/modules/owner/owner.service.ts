import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { Owner } from './owner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnerDto } from './dto/owner.dto';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private ownersRepository: Repository<Owner>,
  ) {}

  async findAll() {
    return await this.ownersRepository.find();
  }

  async findOne(id: FindOneOptions<Owner>) {
    const owner = await this.ownersRepository.findOneBy({ id: id as number });
    if (!owner) {
      throw new NotFoundException(`owner with ID ${id} not found`);
    }
    return owner;
  }

  async insert(body: OwnerDto) {
    const owner = this.ownersRepository.create(body);
    return await this.ownersRepository.save(owner);
  }

  async deleteOne(id: FindOneOptions<Owner>) {
    const result = await this.ownersRepository.delete(id as number);
    if (result.affected === 0) {
      throw new NotFoundException(`owner with ID ${id} not found`);
    }
  }
}
