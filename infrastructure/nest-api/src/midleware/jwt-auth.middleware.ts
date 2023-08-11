import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtAuthGuardMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token Missing' });
    }

    const token = authHeader.slice(7);
    try {
      const decoded = this.jwtService.verify(token);
      req.body.userId = decoded?.userId;
    } catch (error) {
      return res.status(401).json({ message: 'Invalid Token' });
    }

    next();
  }
}
