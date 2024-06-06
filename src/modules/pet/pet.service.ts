import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Pet } from './pet.entity';
import { PetDto } from './dto/pet.dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>,
  ) {}

  async findAll() {
    return await this.petsRepository.find();
  }

  async findOne(id: FindOneOptions<Pet>) {
    const pet = await this.petsRepository.findOneBy({ id: id as number });
    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }
    return pet;
  }

  async insert(body: PetDto) {
    const pet = this.petsRepository.create(body);
    return await this.petsRepository.save(pet);
  }

  async deleteOne(id: FindOneOptions<Pet>) {
    const result = await this.petsRepository.delete(id as number);
    if (result.affected === 0) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }
  }
}
