import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCardDto } from 'src/dto/create-card.dto';
import { UpdateCardDto } from 'src/dto/update-card-id';
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
      orderCard: `card-id-${nextOrderCard}`
    });
    const saveCard =  await this.cardRepository.save(newCard);

    return saveCard;
  }

  async  findAll(): Promise<Card[]> {
      return await this.cardRepository.find()
  }

  async findCardById(id: number): Promise<Card>{
    return  await this.cardRepository.findOneBy({card_id: id})
  }

  async findCardByListId(id: number): Promise<Card[]>{
    return this.cardRepository.createQueryBuilder('card')
    .orderBy( "card.orderCard", "ASC" )
    .where('card.list_id = :id',{id})
    .getMany();
  }

  async updateCard(data: any, updateCardDto: Partial<CreateCardDto>) : Promise<Card> {
    await this.cardRepository.update(data.id , updateCardDto);
    return this.cardRepository.findOne(data);
  }

  async updateCardId(id: number, updateCardDto: UpdateCardDto) : Promise<Card> {
    await this.cardRepository.update(id, updateCardDto);
    return this.cardRepository.findOneBy({card_id: id});
  }

  async deleteCardById(cardId: number): Promise<void> {
    await this.cardRepository.delete(cardId);
}


}
