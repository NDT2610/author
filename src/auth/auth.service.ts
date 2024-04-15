// src/auth/auth.service.ts

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/Users';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  userRepository: any;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  private generateConfirmationToken(email: string): string {
    // Generate a JWT token with the user's email and an expiration timestamp
    return this.jwtService.sign({ email }, { expiresIn: '24h' });
  }

  private decodeConfirmationToken(token: string): string {
    // Decode the JWT token to extract the email address
    const { email } = this.jwtService.verify(token);
    return email;
  }

  async signup(signupDto: SignupDto): Promise<void> {
    const { username, email, password } = signupDto;

    const existingUser = await this.userService.findByUsername(username);
    const existingEmail = await this.userService.findByEmail(email);
    if (existingUser || existingEmail) {
      throw new UnauthorizedException('Username or Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userService.create({ username, email, password: hashedPassword });
    
    const token = this.generateConfirmationToken(email);

    await this.mailService.sendConfirmationEmail(email, token);
  }

  async confirmUsername(token: string): Promise<void> {
    const email = this.decodeConfirmationToken(token);
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.emailVerified = true;
    await this.userRepository.save(user);
  }

  async login(loginDto: LoginDto): Promise<{  accessToken: string, userName: string, id: number, email: string }> {
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

    const accessToken = this.jwtService.sign({ username: user.username, id: user.user_id, email: user.email});
    return { accessToken,userName: user.username, id: user.user_id, email: user.email };
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.userRepository.getUserById(id);
    return user;
  }
  
  async deleteUser(id: number) : Promise<void> {
    await this.userRepository.delete(id);
  }
}
