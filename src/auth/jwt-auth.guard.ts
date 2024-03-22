// jwt-auth.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // Check if JWT token exists in the request headers
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }
    
    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];

    try {
      // Verify and decode the JWT token
      const decoded = this.jwtService.verify(token);
      
      // Attach user information to the request object
      request.user = decoded;
      
      return true;
    } catch (err) {
      return false;
    }
  }
}
