import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import request from 'supertest';

import server from '@app/server';

const prisma = new PrismaClient();
faker.locale = 'pt_BR';

describe('User', () => {
  it('should create a new user', async () => {
    const userToCreate = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber('###########'),
      password: faker.internet.password(),
    };

    const response = await request(server)
      .post('/api/user')
      .send(userToCreate);

    expect(response.status).toBe(200);

    await prisma.users.delete({
      where: { phone: userToCreate.phone },
    });
  });

  it('should not create a new user with missing parameters', async () => {
    const userToCreate = {
      name: faker.name.findName(),
      phone: faker.phone.phoneNumber('###########'),
      password: faker.internet.password(),
    };

    const response = await request(server)
      .post('/api/user')
      .send(userToCreate);

    expect(response.status).toBe(400);
  });

  it('should return a JWT token when create a new user', async () => {
    const userToCreate = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber('###########'),
      password: faker.internet.password(),
    };

    const response = await request(server)
      .post('/api/user')
      .send(userToCreate);

    expect(response.body).toHaveProperty('token');

    await prisma.users.delete({
      where: { phone: userToCreate.phone },
    });
  });
});
