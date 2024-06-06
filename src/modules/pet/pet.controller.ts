import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { Pet } from './pet.entity';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { PetDto } from './dto/pet.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get()
  findAll() {
    return this.petService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: FindOneOptions<Pet>) {
    return this.petService.findOne(id);
  }

  @Post()
  insert(@Body() body: PetDto) {
    return this.petService.insert(body);
  }

  @Delete()
  deleteOne(@Param('id', ParseIntPipe) id: FindOneOptions<Pet>) {
    return this.petService.deleteOne(id);
  }
}
