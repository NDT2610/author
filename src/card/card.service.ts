import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCardDto } from 'src/dto/create-card.dto';
import { Card } from 'src/entities/Card';
import { Repository } from 'typeorm';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ){}

  async createCard(createCardDto: CreateCardDto, listId: number): Promise<Card> {
    const newCard = this.cardRepository.create({
      ...createCardDto,
      list_id: listId,
    });
    return this.cardRepository.save(newCard);
  }

  async  findAll(): Promise<Card[]> {
      return await this.cardRepository.find()
  }

  async findCardById(data: any): Promise<Card>{
    return  await this.cardRepository.findOne(data)
  }

  async updateCard(data: any, updateCardDto: Partial<CreateCardDto>) : Promise<Card> {
    await this.cardRepository.update(data.id , updateCardDto);
    return this.cardRepository.findOne(data);
  }

  async deleteCard(data:any): Promise<void> {
    await this.cardRepository.delete(data.id);
  }

}
