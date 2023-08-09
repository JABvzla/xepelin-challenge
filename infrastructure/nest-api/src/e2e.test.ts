import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { describe, expect, test } from '@jest/globals';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { RegisterDTO } from './dtos/register.dto';

describe('[infrastructure/nestjs-api]', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });
  describe.skip('[register]', () => {
    test(`/POST register user`, () => {
      // Arrange
      const userToRegister: RegisterDTO = {
        name: 'e2e-test-name',
        username: 'e2e-test-username',
        password: 'password-so-secret',
      };
      const expectResult = {
        name: 'e2e-test-name',
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
        name: 'e2e-test-name',
        username: 'e2e-test-username-to-repeat',
        password: 'password-so-secret',
      };
      const repeatedUserName = {
        name: 'e2e-repeated',
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
    await app.close();
  });
});
