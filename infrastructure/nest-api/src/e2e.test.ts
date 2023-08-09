import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './app.module';
import { RegisterDTO } from './dtos/register.dto';
import { AccountDTO } from './dtos/account.dto';

describe('[infrastructure/nestjs-api]', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

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

  afterAll(async () => {
    request(app.getHttpServer())
      .post('/whipe-test-data')
      .then(async () => {
        await app.close();
      });
  });
});
