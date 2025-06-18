import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Status Endpoint (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/status (GET) should return status string', async () => {
    const response = await request(app.getHttpServer())
      .get('/status')
      .expect(200);
    expect(typeof response.text).toBe('string');
    // Optionally, check for specific status value:
    // expect(response.text).toBe('expected status');
  });
});
