import { Controller, Post, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterDTO } from './dtos/register.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  accounts() {
    return this.appService.createAccount();
  }
  @Post()
  transactions() {
    return this.appService.createTransaction();
  }

  @Post('/register')
  register(@Body() body: RegisterDTO) {
    return this.appService.createUser(body);
  }

  @Get()
  getUser() {
    return this.appService.getUser();
  }
}
