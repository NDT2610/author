import { Injectable, CanActivate, ExecutionContext, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { jwtConstants } from './constants';


@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // Check if JWT token exists in the request headers
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    
    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];
    try {
      // Verify and decode the JWT token
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );

      // Attach user information to the request object
      request ['user'] = payload;
      
      return true;
    } catch (err) {
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
  }
}
