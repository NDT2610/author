// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/Users';

@Injectable()
export class AuthService {
  userRepository: any;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<void> {
    const { username, email, password } = signupDto;

    // Check if user already exists
    const existingUser = await this.userService.findByUsername(username);
    if (existingUser) {
      throw new UnauthorizedException('Username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await this.userService.create({ username, email, password: hashedPassword });
  }

  async login(loginDto: LoginDto): Promise<{  accessToken: string, userName: string, id: number }> {
    const { username, password } = loginDto;

    // Find user by username
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign({ username: user.username, id: user.user_id });
    return { accessToken,userName: user.username, id: user.user_id };
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.userRepository.getUserById(id);
    return user;
  }
  
}
