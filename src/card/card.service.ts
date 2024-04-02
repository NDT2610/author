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
    const maxOrderCard = await this.cardRepository
      .createQueryBuilder('card')
      .select("MAX(card.orderCard)",'maxOrderCard')
      .where('card.list_id = :listId', {listId} )
      .getRawOne();

      const nextOrderCard = (maxOrderCard.maxOrderCard || 0) +1;
    
    const newCard = this.cardRepository.create({
      ...createCardDto,
      list_id: listId,
      orderCard: nextOrderCard
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

  async deleteCardById(cardId: number): Promise<void> {
    await this.cardRepository.delete(cardId);
}


}
