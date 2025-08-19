const request = require('supertest');
const app = require('../app');

describe('Auth Routes', () => {
  it('should redirect to Google for authentication', async () => {
    const res = await request(app).get('/auth/google');
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toContain('accounts.google.com');
  });

  it('should return 401 for a protected route without authentication', async () => {
    const res = await request(app).get('/api/profile');
    expect(res.statusCode).toEqual(401);
  });
});