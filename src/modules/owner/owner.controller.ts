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

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.ownerService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: FindOneOptions<Owner>) {
    return this.ownerService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  insert(@Body() body: OwnerDto) {
    return this.ownerService.insert(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteOne(@Param('id', ParseIntPipe) id: FindOneOptions<Owner>) {
    return this.ownerService.deleteOne(id);
  }
}
