import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user-by-email')
  findByEmail(@Body('email') email: string) {
    return this.userService.findOne(email);
  }
}
