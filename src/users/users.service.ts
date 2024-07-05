import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpInput } from './dto/sign-up.input';
import { User } from './entities/user.entity';
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { LoginInput } from './dto/login.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {  }

  async signUp(signUpInput: SignUpInput): Promise<{ token: string }> {
    const { password, email } = signUpInput;

    if (await this.usersRepository.findOne({ where: { email } })) {
      throw new HttpException(
        "user with email already exist",
        HttpStatus.BAD_REQUEST
      );
    }
 
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.save({
      ...signUpInput,
      password: hashedPassword,
    });
    
    const token = this.jwtService.sign({ id: user?.id });

    return { token };
  }

  async login(loginInput: LoginInput): Promise<{ token: string; user: User }> {
    const { email, password } = loginInput;

    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const token = this.jwtService.sign({ id: user.id });
    delete user["password"];

    return { token, user };
  }
}
