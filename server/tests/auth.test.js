import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import bcrypt from 'bcrypt';
const api = supertest(app);

import User from '../models/user.js';

import {
  initialUsers,
  wrongUsers,
  userInDb,
} from './helpers/authtesthelper.js';

beforeEach(async () => {
  await User.deleteMany({});
  for (let user of initialUsers) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(user.password, salt);
    await User.create({ username: user.username, password: passwordHash });
  }
});

describe('register', () => {
  test('a new user can be added', async () => {
    const newUser = {
      username: 'fffff',
      password: 'fffff',
    };
    await api
      .post('/api/auth/register')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const getUsers = await userInDb();
    expect(getUsers).toHaveLength(initialUsers.length + 1);
    const content = getUsers.map((user) => user.username);
    expect(content).toContain('fffff');
  });

  test('username must be valid', async () => {
    const newUser = {
      username: 'f',
      password: 'fffff',
    };
    await api.post('/api/auth/register').send(newUser).expect(400);
    const getUsers = await userInDb();
    expect(getUsers).toHaveLength(initialUsers.length);
  });

  test('password must be valid', async () => {
    const newUser = {
      username: 'fffff',
      password: 'ff',
    };
    await api.post('/api/auth/register').send(newUser).expect(400);
    const getUsers = await userInDb();
    expect(getUsers).toHaveLength(initialUsers.length);
  });
});

describe('login', () => {
  test('authorized users can login', async () => {
    const getUsers = await userInDb();
    const user = {
      username: 'aaaaa',
      password: 'aaaaa',
    };
    const res = await api.post('/api/auth/login').send(user).expect(200);
  });
  test('unauthorized users cant login', async () => {
    for (const user of wrongUsers) {
      await api.post('/api/auth/login').send(user).expect(401);
    }
  });
});

afterAll(() => {
  mongoose.connection.close();
});
