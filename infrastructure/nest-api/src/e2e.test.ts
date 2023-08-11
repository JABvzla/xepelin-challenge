// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env' });
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './app.module';
import { AccountDTO } from './dtos/account.dto';
import { RegisterDTO } from './dtos/register.dto';
import { TransactionDTO } from './dtos/transaction.dto';
import './midleware/jwt-auth.middleware';

jest.mock('./midleware/jwt-auth.middleware', () => ({}));
describe.only('[Infrastructure] e2e-nestjs-api', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    return request(app.getHttpServer()).post('/whipe-test-data');
  }, 10000);

  describe('[account]', () => {
    test('/POST create account', async () => {
      // Arrange
      const userWithAccount: RegisterDTO = {
        name: 'e2e-create-account',
        username: 'e2e-create-account',
        password: 'magic-password',
      };
      const accountToRegister: AccountDTO = {
        name: 'e2e-create-account',
        number: '131415',
        userId: '',
        balance: 5000,
      };
      const expectResult = {
        balance: 5000,
        name: 'e2e-create-account',
        number: '131415',
      };

      // Action
      const result = request(app.getHttpServer())
        .post('/register')
        .send(userWithAccount)
        .then((res) => {
          expect(res.body.id).not.toBeNull();
          accountToRegister.userId = res.body.id;
          return request(app.getHttpServer())
            .post('/account')
            .send(accountToRegister);
        });
      // Assert
      return result.then(function (res) {
        expect(res.status).toEqual(201);
        expect(res.body).toEqual(expect.objectContaining(expectResult));
        expect(res.body.id).not.toBeNull();
        expect(res.body.userId).not.toBeNull();
      });
    });
  });
  describe('[register]', () => {
    test(`/POST register user`, () => {
      // Arrange
      const userToRegister: RegisterDTO = {
        name: 'e2e-register-user',
        username: 'e2e-test-username',
        password: 'password-so-secret',
      };
      const expectResult = {
        name: 'e2e-register-user',
        username: 'e2e-test-username',
        password: '',
      };
      // Action
      const result = request(app.getHttpServer())
        .post('/register')
        .send(userToRegister);
      // Assert
      return result.expect(function (res) {
        expect(res.status).toEqual(201);
        expect(res.body).toEqual(expect.objectContaining(expectResult));
        expect(res.body.id).not.toBeNull();
      });
    });

    test(`/POST register username already exists`, async () => {
      // Arrange
      const userToRegister: RegisterDTO = {
        name: 'e2e-repeated-username',
        username: 'e2e-test-username-to-repeat',
        password: 'password-so-secret',
      };
      const repeatedUserName = {
        name: 'e2e-repeated-username-2',
        username: userToRegister.username,
        password: 'password-easy',
      };
      const expectResult = {
        message: 'username already exist',
        statusCode: 400,
      };
      // Action
      await request(app.getHttpServer()).post('/register').send(userToRegister);
      const result = request(app.getHttpServer())
        .post('/register')
        .send(repeatedUserName);
      // Assert
      return result.expect(function (res) {
        expect(res.status).toEqual(400);
        expect(res.body).toEqual(expectResult);
      });
    });
  });
  describe('[transaction]', () => {
    test(`/POST create DEPOSIT transaction`, async () => {
      // Arrange
      const userWithAccount: RegisterDTO = {
        name: 'e2e-create-transaction-deposit',
        username: 'e2e-create-transaction-deposit',
        password: 'funny-password',
      };
      const accountToRegister: AccountDTO = {
        name: 'e2e-create-account',
        number: '55123',
        userId: '',
        balance: 2545.05,
      };
      const transactionToRegister: TransactionDTO = {
        type: 'DEPOSIT',
        userId: '',
        amount: 25000,
      };
      const expectResult = {
        type: 'DEPOSIT',
        amount: 25000,
      };
      const expectedLog = (userId) =>
        `[transaction] user: ${userId} amount: 25000`;
      console.log = jest.fn();

      // Action
      const result = request(app.getHttpServer())
        .post('/register')
        .send(userWithAccount)
        .then((userRes) => {
          expect(userRes.body.id).not.toBeNull();
          accountToRegister.userId = userRes.body.id;
          return request(app.getHttpServer())
            .post('/account')
            .send(accountToRegister)
            .then((res) => {
              expect(res.body.userId).not.toBeNull();
              transactionToRegister.userId = res.body.userId;
              return request(app.getHttpServer())
                .post('/transaction')
                .send(transactionToRegister);
            });
        });
      // Assert
      return result.then(function (res) {
        expect(res.status).toEqual(201);
        expect(res.body).toEqual(expect.objectContaining(expectResult));
        expect(res.body.id).not.toBeNull();
        expect(res.body.userId).not.toBeNull();
        expect(console.log).toHaveBeenCalledWith(expectedLog(res.body.userId));
      });
    });
    test(`/POST create WITHDRAWAL transaction`, async () => {
      // Arrange
      const userWithAccount: RegisterDTO = {
        name: 'e2e-create-transaction-withdrawal',
        username: 'e2e-create-transaction-withdrawal',
        password: 'funny-password',
      };
      const accountToRegister: AccountDTO = {
        name: 'e2e-create-account',
        number: '55123',
        userId: '',
        balance: 2545.05,
      };
      const transactionToRegister: TransactionDTO = {
        type: 'WITHDRAWAL',
        userId: '',
        amount: 1500,
      };
      const expectResult = {
        type: 'WITHDRAWAL',
        amount: 1500,
      };

      // Action
      const result = request(app.getHttpServer())
        .post('/register')
        .send(userWithAccount)
        .then((userRes) => {
          expect(userRes.body.id).not.toBeNull();
          accountToRegister.userId = userRes.body.id;
          return request(app.getHttpServer())
            .post('/account')
            .send(accountToRegister)
            .then((res) => {
              expect(res.body.userId).not.toBeNull();
              transactionToRegister.userId = res.body.userId;
              return request(app.getHttpServer())
                .post('/transaction')
                .send(transactionToRegister);
            });
        });
      // Assert
      return result.then(function (res) {
        expect(res.status).toEqual(201);
        expect(res.body).toEqual(expect.objectContaining(expectResult));
        expect(res.body.id).not.toBeNull();
        expect(res.body.userId).not.toBeNull();
      });
    });
  });

  describe('[login]', () => {
    test('/POST login should sign in a user and return an access token', async () => {
      // Arrange
      const loginRequest = {
        username: 'e2e-login-username',
        password: 'password-to-login',
      };
      const userToRegister: RegisterDTO = {
        name: 'e2e-login-user',
        ...loginRequest,
      };
      // Action
      const result = request(app.getHttpServer())
        .post('/register')
        .send(userToRegister)
        .then((res) => {
          expect(res.body.id).not.toBeNull();
          return request(app.getHttpServer()).post('/login').send(loginRequest);
        });
      // Assert
      return result.then(function (res) {
        expect(res.status).toEqual(200);
        expect(res.body.access_token).not.toBeNull();
      });
    });

    test('should return Unauthorized when invalid credentials are provided', async () => {
      // Arrange
      const invalidUserCredentials = {
        username: 'invalidUsername',
        password: 'invalidPassword',
      };
      const expectResult = { message: 'login_fail', statusCode: 400 };

      // Action & Assert
      await request(app.getHttpServer())
        .post('/login')
        .send(invalidUserCredentials)
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expectResult);
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
