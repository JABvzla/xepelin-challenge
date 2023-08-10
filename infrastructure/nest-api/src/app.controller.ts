import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AccountDTO } from './dtos/account.dto';
import { RegisterDTO } from './dtos/register.dto';
import { TransactionDTO } from './dtos/transaction.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @HttpCode(200)
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
  @Post('/transaction')
  transactions(@Body() body: TransactionDTO) {
    return this.appService.createTransaction(body);
  }

  @Post('/login')
  @HttpCode(200)
  login(@Body() body) {
    return this.appService.login(body.username, body.password);
  }
  @Post('/whipe-test-data')
  whipeTestData() {
    return this.appService.whipeTestData();
  }
}
