import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from 'src/dto/create-list.dto';
import { List } from 'src/entities/List';
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  async createList(@Body() createListDto: CreateListDto): Promise<List>{
    return this.listService.createList(createListDto);
  }

  @Get()
  async getAllLists(): Promise<List[]>{
    return this.listService.getAllLists();
  }

  @Get(':id')
  async getListById(@Param('id') id: number): Promise<List> {
    return this.listService.getListById(id);
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
