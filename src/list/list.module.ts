import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from 'src/entities/List';

@Module({
  imports:[TypeOrmModule.forFeature([List])],
  controllers: [ListController],
  providers: [ListService]
})
export class ListModule {}
