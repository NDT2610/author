import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from 'src/dto/create-list.dto';
import { List } from 'src/entities/List';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('list')
@UseGuards(JwtAuthGuard)
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post(':boardId')
  async createList(@Param('boardId') boardId: number, @Body() createListDto: CreateListDto): Promise<List>{
    return this.listService.createList(createListDto, boardId);
  }

  @Get()
  async getAllLists(): Promise<List[]>{
    return this.listService.getAllLists();
  }

  @Get(':id')
  async getListByBoardId(@Param('id') id: number): Promise<List[]> {
    return this.listService.getListByBoardId(id);
  }

  @Put(':id')
  async updateList(@Param('id') id: number,
  @Body() updateListDto: Partial<CreateListDto>) : Promise <List>{
    return this.listService.updateList(id, updateListDto);
  }

  @Delete( ':id' )
  async deleteList(@Param('id') id: number): Promise<void> {
    return this.listService.deleteList(id);
  }
}
