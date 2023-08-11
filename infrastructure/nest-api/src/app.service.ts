import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createAccount as applicationCreateAccount } from './../../../application/create-account';
import { createTransaction as applicationCreateTransaction } from './../../../application/create-transaction';
import { Account } from './../../../domain/account';
import { Auth } from './../../../domain/auth';
import { Repository } from './../../../domain/generics';
import { Transaction } from './../../../domain/transaction';
import { User } from './../../../domain/user';
import { mongooseRepository } from './adapter/mongooseRepository';
import { AccountDTO } from './dtos/account.dto';
import { RegisterDTO } from './dtos/register.dto';
import { TransactionDTO } from './dtos/transaction.dto';
import { AccountClass, AccountDocument } from './schemas/account.schema';
import { AuthClass, AuthDocument } from './schemas/auth.schema';
import {
  TransactionClass,
  TransactionDocument,
} from './schemas/transaction.schema';
import { UserClass, UserDocument } from './schemas/user.schema';

@Injectable()
export class AppService {
  userRepository: Repository<User>;
  authRepository: Repository<Auth>;
  transactionRepository: Repository<Transaction>;
  accountRepository: Repository<Account>;

  constructor(
    @InjectModel(AuthClass.name)
    private readonly authModel: Model<AuthDocument>,
    @InjectModel(AccountClass.name)
    private readonly accountModel: Model<AccountDocument>,
    @InjectModel(UserClass.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(TransactionClass.name)
    private readonly transactionModel: Model<TransactionDocument>,
    private jwtService: JwtService,
  ) {
    this.userRepository = mongooseRepository<User>(this.userModel);
    this.authRepository = mongooseRepository<Auth>(this.authModel);
    this.transactionRepository = mongooseRepository<Transaction>(
      this.transactionModel,
    );
    this.accountRepository = mongooseRepository<Account>(this.accountModel);
  }
  async whipeTestData() {
    await this.accountModel.deleteMany({
      name: { $regex: 'e2e', $options: 'i' },
    });
    await this.authModel.deleteMany({
      username: { $regex: 'e2e', $options: 'i' },
    });
    await this.userModel.deleteMany({
      name: { $regex: 'e2e', $options: 'i' },
    });
    return;
  }
  async createUser(request: RegisterDTO) {
    const { name, username, password } = request;
    const usernameExist = await this.authModel.exists({ username });
    if (usernameExist?._id) {
      throw new HttpException('username already exist', HttpStatus.BAD_REQUEST);
    }
    const newAuth = await this.authModel.create({ username, password });
    const newUser = await this.userModel.create({ name, auth: [newAuth._id] });
    return {
      access_token: await this.jwtService.signAsync({ userId: newUser._id }),
      id: newUser._id,
      name: newUser.name,
      username: newAuth.username,
      password: '',
    };
  }
  async login(username, password) {
    const auth = await this.authModel.findOne({ username, password });
    if (!auth) {
      throw new HttpException('login fail', HttpStatus.UNAUTHORIZED);
    }
    const user = await this.userModel.findOne({ auth: auth._id });
    if (!user) {
      throw new HttpException('login fail', HttpStatus.UNAUTHORIZED);
    }
    const payload = { userId: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async createAccount(request: AccountDTO) {
    return applicationCreateAccount(
      request,
      this.userRepository,
      this.accountRepository,
    );
  }
  async createTransaction(request: TransactionDTO) {
    return applicationCreateTransaction(
      request,
      this.userRepository,
      this.transactionRepository,
      this.accountRepository,
    );
  }

  getUser() {
    // return this.authModel.find();
  }
}
