import { Body, Controller, Get, Param, Post, Put,Delete } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from 'src/dto/create-card.dto';
import { Card } from 'src/entities/Card';

@Controller('card')
export class CardController {
  constructor(private readonly  cardService: CardService) {}


  @Post()
  async createCard(@Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardService.createCard(createCardDto);
  }

  @Get()
  async getAllCard(): Promise<Card[]>{
    return this.cardService.findAll();
  }

  @Get(':id')
  async getCardById(@Param('id') id: number): Promise<Card> {
    return this.cardService.findCardById(id);
  }

  @Put(':id')
  async updateCard(@Param('id') id: number, @Body() updateCardDto: Partial<CreateCardDto>): Promise<Card> {
    return this.cardService.updateCard(id, updateCardDto);
  }
  @Delete( ':id' )
  async deleteList(@Param('id') id: number): Promise<void> {
    return this.cardService.deleteCard(id);
  }
}
