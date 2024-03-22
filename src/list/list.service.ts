import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateListDto } from 'src/dto/create-list.dto';
import { List } from 'src/entities/List';
import { Repository } from 'typeorm';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>
  ){}

  async createList(createListDto: CreateListDto): Promise<List>{
    const newList = this.listRepository.create(createListDto);
    return await this.listRepository.save(newList);
  }

  async getAllLists():  Promise<List[]> {
    return this.listRepository.find();
  }

  async getListById(data: any): Promise<List> {
    return this.listRepository.findOne(data);
  }

  async updateList(data: any, updateListDto: Partial<CreateListDto>): Promise<List> {
    await this.listRepository.update(data, updateListDto);
    return this.listRepository.findOne(data);
  }

  async deleteList(id: number): Promise<void> {
    await this.listRepository.delete(id);
  }
}
