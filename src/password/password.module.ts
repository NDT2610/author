import { Module } from '@nestjs/common';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Password } from 'src/entities/Password';
import { MailModule } from 'src/mail/mail.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Password]), 
    MailModule,
    UserModule
  ],
  controllers: [PasswordController],
  providers: [PasswordService]
})
export class PasswordModule {}
