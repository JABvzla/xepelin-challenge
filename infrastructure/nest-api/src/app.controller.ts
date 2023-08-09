import { Controller, Post, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterDTO } from './dtos/register.dto';
import { AccountDTO } from './dtos/account.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getUser() {
    return this.appService.getUser();
  }
  @Post('/register')
  register(@Body() body: RegisterDTO) {
    return this.appService.createUser(body);
  }
  @Post('/account')
  accounts(@Body() body: AccountDTO) {
    return this.appService.createAccount(body);
  }
  @Post()
  transactions() {
    return this.appService.createTransaction();
  }
  @Post('whipe-test-data')
  whipeTestData() {
    return this.appService.whipeTestData();
  }
}
