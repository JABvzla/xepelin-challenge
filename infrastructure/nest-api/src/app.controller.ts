import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { AccountDTO } from './dtos/account.dto';
import { RegisterDTO } from './dtos/register.dto';
import { TransactionDTO } from './dtos/transaction.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('user-detail')
  @HttpCode(200)
  async getUser(@Req() request: Request) {
    return this.appService.getUser(request);
  }
  @Post('/register')
  async register(@Body() body: RegisterDTO) {
    return this.appService.createUser(body);
  }
  @Post('/account')
  async accounts(@Body() body: AccountDTO) {
    const response = await this.appService.createAccount(body);
    if (typeof response === 'string')
      throw new HttpException(response, HttpStatus.BAD_REQUEST);
    return response;
  }

  @Post('/transaction')
  async transactions(@Body() body: TransactionDTO) {
    const response = await this.appService.createTransaction(body);
    if (typeof response === 'string')
      throw new HttpException(response, HttpStatus.BAD_REQUEST);
    return response;
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() body) {
    return this.appService.login(body.username, body.password);
  }
  @Post('/whipe-test-data')
  async whipeTestData() {
    return this.appService.whipeTestData();
  }
}
