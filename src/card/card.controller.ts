import { Body, Controller, Get, Param, Post, Put,Delete, UseGuards } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from 'src/dto/create-card.dto';
import { Card } from 'src/entities/Card';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateCardDto } from 'src/dto/update-card-id';

@Controller('card')
@UseGuards(JwtAuthGuard)
export class CardController {
  constructor(private readonly  cardService: CardService) {}


  @Post(':listId')
  async createCard(@Param('listId') listId: number, @Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardService.createCard(createCardDto, listId);
  }

  @Get()
  async getAllCard(): Promise<Card[]>{
    return this.cardService.findAll();
  }

  @Get(':id')
  async getCardById(@Param('id') id: number): Promise<Card> {
    return this.cardService.findCardById(id);
  }

  @Get('get/:id')
  async getCardByListId(@Param('id') id: number): Promise<Card[]> {
    return this.cardService.findCardByListId(id);
  }

  @Put(':id')
  async updateCard(@Param('id') id: number, @Body() updateCardDto: Partial<CreateCardDto>): Promise<Card> {
    return this.cardService.updateCard(id, updateCardDto);
  }

  @Put('update/:id')
  async updateCardId(@Param('id') id: number, @Body() updateCardDto: UpdateCardDto): Promise<Card> {
    return this.cardService.updateCardId(id, updateCardDto);
  }
  @Delete( ':id' )
  async deleteList(@Param('id') id: number) {
    return this.cardService.deleteCardById(id);
  }
}
