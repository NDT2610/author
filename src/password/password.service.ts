import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Password } from 'src/entities/Password';
import { Repository } from 'typeorm';

@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(Password) private readonly passwordRepository: Repository<Password>
  ){}

  async create(body: any){
    return this.passwordRepository.save(body);
  }

  async findByToken(token: string): Promise<Password>{
    return await this.passwordRepository.findOne({ where: { token: token } });
  }
}
