import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
  const { app } = await boot;
  application = app;
});

describe('Users e2e', () => {
  it('Register - error', async () => {
    const res = await request(application.app)
      .post('/users/register')
      .send({ email: 'lol4@gmail.com', password: '1' });

    expect(res.statusCode).toBe(422);
  });

  it('Login - success', async () => {
    const res = await request(application.app)
      .post('/users/login')
      .send({ email: 'lol4@gmail.com', password: 'qwerty' });

    expect(res.body.jwt).not.toBeUndefined();
  });

  it('Login - error', async () => {
    const res = await request(application.app)
      .post('/users/login')
      .send({ email: 'lol4@gmail.com', password: '1' });

    expect(res.statusCode).toEqual(401);
  });

  it('Info - success', async () => {
    const login = await request(application.app)
      .post('/users/login')
      .send({ email: 'lol4@gmail.com', password: 'qwerty' });

    const res = await request(application.app)
      .get('/users/info')
      .set({
        Authorization: `Bearer ${login.body.jwt}`,
      });

    expect(res.body).toEqual({
      id: 4,
      email: 'lol4@gmail.com',
      name: 'art4',
    });
  });

  it('Info - fail', async () => {
    const login = await request(application.app)
      .post('/users/login')
      .send({ email: 'lol4@gmail.com', password: 'qwerty' });

    const res = await request(application.app).get('/users/info').set({
      Authorization: `111`,
    });

    expect(res.body).toEqual({
      error: 'You are not authorized',
    });
  });
});

afterAll(() => {
  application.close();
});
