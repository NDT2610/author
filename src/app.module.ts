import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/Users';
import { BoardModule } from './board/board.module';
import { ListModule } from './list/list.module';
import { CardModule } from './card/card.module';
import { Board } from './entities/Board';
import { Card } from './entities/Card';
import { List } from './entities/List';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Thang@26102001',
    database: 'security',
    entities: [User, Board, List, Card],
    synchronize: true
  }),  BoardModule, ListModule, CardModule, AuthModule, UserModule
],
})
export class AppModule {}
