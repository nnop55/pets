import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { Owner } from './owner.entity';
import { FindOneOptions } from 'typeorm';
import { OwnerDto } from './dto/owner.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Get()
  findAll() {
    return this.ownerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: FindOneOptions<Owner>) {
    return this.ownerService.findOne(id);
  }

  @Post()
  insert(@Body() body: OwnerDto) {
    return this.ownerService.insert(body);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: FindOneOptions<Owner>) {
    return this.ownerService.deleteOne(id);
  }
}
