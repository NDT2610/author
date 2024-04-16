// src/users/user.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/Users';
import { CreateUserDto } from '../dto/createUser.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(data: any): Promise<User> {
    return this.userRepository.findOne(data);
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findByEmail(Email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email:Email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(data: any, updateUserDto: Partial<User>): Promise<User> {
    await this.userRepository.update(data, updateUserDto);
    return this.userRepository.findOne(data);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

}
