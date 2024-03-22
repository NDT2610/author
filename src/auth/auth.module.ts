

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy'; // Assuming you have implemented JWT strategy
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';


@Module({
  imports: [
    UserModule, // Import UserModule to use UserService
    JwtModule.register({
      secret: jwtConstants.secret, // Replace with your own secret key
      signOptions: { expiresIn: '1d' }, // Set token expiration
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController] // Export AuthService to be used in other modules
})
export class AuthModule {}
