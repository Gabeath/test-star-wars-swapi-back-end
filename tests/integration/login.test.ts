import request from 'supertest';

import server from '../../src/app/src/server';

describe('Authentication', () => {
  it('should authenticate with valid credentials', async () => {
    const response = await request(server)
      .post('/api/login')
      .send({
        email: 'gabrielzambuzi7@gmail.com',
        password: '123123',
      });

    expect(response.status).toBe(200);
  });
});
