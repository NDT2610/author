// board.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../entities/board'; // Assuming you have a Board entity
import { CreateBoardDto } from 'src/dto/create-board.dto';
import { User } from 'src/entities/Users';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async createBoard(createBoardDto: CreateBoardDto, createdBy: User): Promise<Board> {
    const newBoard = this.boardRepository.create({ ...createBoardDto, created_by: createdBy });
    return this.boardRepository.save(newBoard);
  }
  async getBoardById(data: any): Promise<Board> {
    return this.boardRepository.findOne(data);
  }

  async updateBoard(data: any, boardData: Partial<Board>): Promise<Board> {
    await this.boardRepository.update(data, boardData);
    return this.boardRepository.findOneBy(data);
  }

  async deleteBoard(id: number): Promise<void> {
    await this.boardRepository.delete(id);
  }
}
