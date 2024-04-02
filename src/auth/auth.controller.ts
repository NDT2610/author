// src/auth/auth.controller.ts

import { Controller, Post, Body, ValidationPipe,Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body(ValidationPipe) signupDto: SignupDto): Promise<void> {
    await this.authService.signup(signupDto);
  }

  @Post('login')
  async login(@Body(ValidationPipe) loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    // Clear access token from local storage
    res.setHeader('Set-Cookie', [`accessToken=; Max-Age=0; Path=/; HttpOnly`]);
    return res.send();
  }

}
