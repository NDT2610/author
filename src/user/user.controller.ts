// user.controller.ts

import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/Users'; // Assuming you have a User entity

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

}
