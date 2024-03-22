// board.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from '../entities/board';  // Assuming you have a Board entity
import { CreateBoardDto } from '../dto/create-board.dto'; // Assuming you have a DTO for creating boards
import { JwtAuthGuard  } from 'src/auth/jwt-auth.guard';
@Controller('boards')
@UseGuards(JwtAuthGuard )
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async getAllBoards(): Promise<Board[]> {
    return this.boardService.getAllBoards();
  }

  @Get(':id')
  async getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  
  @Post()
  async createBoard(@Body() createBoardDto: CreateBoardDto, @Req() request): Promise<Board> {
    const { user } = request; 
    return this.boardService.createBoard(createBoardDto, user.user_id);
  }
  @Put(':id')
  async updateBoard(@Param('id') id: number, @Body() updateBoardDto: Partial<Board>): Promise<Board> {
    
    return this.boardService.updateBoard(id, updateBoardDto);

  }

  @Delete(':id')
  async deleteBoard(@Param('id') id: number): Promise<void> {
    return this.boardService.deleteBoard(id);
  }
}
