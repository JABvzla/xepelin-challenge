import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDTO } from './dtos/register.dto';
import { AccountClass, AccountDocument } from './schemas/account.schema';
import { AuthClass, AuthDocument } from './schemas/auth.schema';
import {
  TransactionClass,
  TransactionDocument,
} from './schemas/transaction.schema';
import { UserClass, UserDocument } from './schemas/user.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(AuthClass.name)
    private readonly authModel: Model<AuthDocument>,
    @InjectModel(AccountClass.name)
    private readonly accountModel: Model<AccountDocument>,
    @InjectModel(UserClass.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(TransactionClass.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}
  async createAccount() {}
  async createTransaction() {}
  async createUser(request: RegisterDTO) {
    const { name, username, password } = request;
    const usernameExist = await this.authModel.exists({ username });
    if (usernameExist?._id) {
      throw new HttpException('username already exist', HttpStatus.BAD_REQUEST);
    }
    const newAuth = await this.authModel.create({ username, password });
    const newUser = await this.userModel.create({ name, auth: [newAuth._id] });
    return {
      id: newUser._id,
      name: newUser.name,
      username: newAuth.username,
      password: '',
    };
  }
  getUser() {
    // return this.authModel.find();
  }
}
