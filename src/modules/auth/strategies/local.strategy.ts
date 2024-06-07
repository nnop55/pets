import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { comparePassword } from 'src/utils/bcrypt';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.validateUser(email, password);
    
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    
    if (user && (await comparePassword(password, user.password))) {
      return user;
    }
    return null;
  }
}
