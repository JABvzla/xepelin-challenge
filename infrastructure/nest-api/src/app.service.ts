import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createAccount as applicationCreateAccount } from './../../../application/create-account';
import { Account } from './../../../domain/account';
import { Auth } from './../../../domain/auth';
import { Repository } from './../../../domain/generics';
import { Transaction } from './../../../domain/transaction';
import { User } from './../../../domain/user';
import { Model } from 'mongoose';
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
  async createAccount(request: AccountDTO) {
    return applicationCreateAccount(
      request,
      this.userRepository,
      this.accountRepository,
    );
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
      id: newUser._id,
      name: newUser.name,
      username: newAuth.username,
      password: '',
    };
  }
  async createTransaction(request: TransactionDTO) {
    const { amount, type, userId } = request;
    const user = await this.userModel.findOne({ _id: userId });
    if (!user?._id) {
      throw new HttpException("user doesn't exist", HttpStatus.BAD_REQUEST);
    }
    if (!user.accounts?.length) {
      throw new HttpException('user without account', HttpStatus.BAD_REQUEST);
    }
    const accountId = user.accounts[0];
    const newTransaction = await this.transactionModel.create({
      account: accountId,
      amount,
      type,
    });
    await this.accountModel.findByIdAndUpdate(accountId, {
      $push: { transaction: newTransaction._id },
    });

    return {
      id: newTransaction._id,
      userId,
      amount: newTransaction.amount,
      type: newTransaction.type,
      createdAt: newTransaction.createdAt,
    };
  }

  getUser() {
    // return this.authModel.find();
  }
}
