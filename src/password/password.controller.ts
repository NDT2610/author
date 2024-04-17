import { BadRequestException, Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { PasswordService } from './password.service';
import { MailService } from 'src/mail/mail.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'

@Controller('password')
export class PasswordController {
  constructor(
    private passwordService: PasswordService,
    private mailService: MailService,
    private userService: UserService
  ){}

  @Post('forgot')
  async forgot(
    @Body('email') email: string
  ){
    const token = Math.random().toString(20).substring(2, 12);

    await this.passwordService.create({
      email,
      token
    });

    await this.mailService.sendResetPasswordEmail(email, token);

    return {
      message: 'Reset password, check your email'
    }
  }
  

  @Post('reset')
  async reset(
  @Body('token') token: string,
  @Body('password') password: string,
  @Body('passwordConfirm') passwordConfirm: string
) {
  // Check if passwords match
  if (password !== passwordConfirm) {
    throw new BadRequestException('Passwords do not match');
  }

  const passwordReset = await this.passwordService.findByToken(token);

  // Find user by email
  const user = await this.userService.findByEmail(passwordReset.email );

  // Check if user exists
  if (!user) {
    throw new NotFoundException('User not found');
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);

  await this.userService.update(user.user_id, {
    password: hashedPassword
  });

  // Delete password reset request

  return {
    message: 'Password reset successfully'
  };
}
}

