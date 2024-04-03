import { Injectable,  } from '@nestjs/common';
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

  async createList(createListDto: CreateListDto, boardId: number): Promise<List> {
    // Fetch the maximum orderlist value for lists belonging to the same board
    const maxOrderList = await this.listRepository
      .createQueryBuilder('list')
      .select('MAX(list.orderlist)', 'maxOrderList')
      .where('list.board_id = :boardId', { boardId })
      .getRawOne();

    // Determine the orderList value for the new list
    const nextOrderList = (maxOrderList.maxOrderList || 0) + 1;

    // Create the new list with the calculated orderList value
    const newList = this.listRepository.create({
      ...createListDto,
      board_id: boardId,
      orderlist: nextOrderList,
    });

    // Save the new list to the database
    const savedList = await this.listRepository.save(newList);

    return savedList;
  }

  async getAllLists():  Promise<List[]> {
    return this.listRepository.find();
  }

  async getListById(data: any): Promise<List> {
    return this.listRepository.findOne(data);
  }

  async getListByBoardId(board_id: number): Promise<List[] | undefined> {
    return this.listRepository.createQueryBuilder('list')
      .where('list.board_id = :board_id', { board_id })
      .getMany();
  }
  
  async updateList(id: number, updateListDto: Partial<CreateListDto>): Promise<List> {
    await this.listRepository.update({list_id: id}, updateListDto);
    return this.listRepository.findOneBy({list_id: id});
  }
  

  async deleteList(id: number): Promise<void> {
    await this.listRepository.delete(id);
  }

}
