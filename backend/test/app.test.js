const request = require('supertest');
const app = require('../src/app');

describe('System Health Check', () => {

  // Test 1: Check if the basic API route is working
  it('GET /api/test should return 200 and success message', async () => {
    const res = await request(app).get('/api/test');

    // Assertions
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('ok');
    expect(res.body.message).toEqual('Connection successful!');
  });

  // Test 2: Check if a non-existent route returns 404
  it('GET /api/non-existent-route should return 404', async () => {
    const res = await request(app).get('/api/not-found');
    
    // Assuming your error handler catches 404s, or Express default behavior
    expect(res.statusCode).toEqual(404);
  });
});