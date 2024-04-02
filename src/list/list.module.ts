import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from 'src/entities/List';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([List]), JwtModule],
  controllers: [ListController],
  providers: [ListService]
})
export class ListModule {}
