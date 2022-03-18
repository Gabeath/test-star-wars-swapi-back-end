import request from 'supertest';

import server from '@app/server';

import { generateJWT } from '@utilities/utils';

describe('People', () => {
  it('should return people paginated to authenticated user', async () => {
    const response = await request(server)
      .get('/api/people?page=1')
      .set('Authorization', `Bearer ${generateJWT({ userId: 'userId' })}`);

    expect(response.status).toBe(200);
  });

  it('should not return people paginated to unauthorized user', async () => {
    const response = await request(server)
      .get('/api/people?page=1');

    expect(response.status).toBe(401);
  });

  it('should return people paginated in a array results', async () => {
    const response = await request(server)
      .get('/api/people?page=1')
      .set('Authorization', `Bearer ${generateJWT({ userId: 'userId' })}`);

    expect(response.body).toHaveProperty('results');
  });
});
