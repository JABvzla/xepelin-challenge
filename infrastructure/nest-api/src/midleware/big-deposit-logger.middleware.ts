import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const AMOUNT_TO_WARNING = 10000;

@Injectable()
export class BigDepositLogger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    res.on('finish', () => {
      if (req?.body?.amount > AMOUNT_TO_WARNING && res.statusCode === 201) {
        console.log(
          `[transaction] user: ${req?.body?.userId} amount: ${req?.body?.amount}`,
        );
      }
    });
    next();
  }
}
