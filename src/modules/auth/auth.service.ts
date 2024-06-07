import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { comparePassword, hashPassword } from 'src/utils/bcrypt';
import { LoginUserDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);

    if (user && (await comparePassword(password, user.password))) {
      return user;
    }
    return null;
  }

  async register(payload: CreateUserDto) {
    const { email, password, name } = payload;
    const hashedPassword = await hashPassword(password);

    const exists = await this.validateUser(email, password);

    if (exists) {
      throw new BadRequestException('User already registered with this email');
    }

    const user = this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return await this.usersRepository.save(user);
  }

  async logout(email: string) {
    await this.userService.updateUserToken(email, null);

    return { email: email, accessToken: null };
  }

  async login(user: LoginUserDto) {
    const payload = { email: user.email };
    const accessToken = this.jwtService.sign(payload);

    await this.userService.updateUserToken(user.email, accessToken);

    return {
      accessToken,
    };
  }
}
