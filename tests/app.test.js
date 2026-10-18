const request = require('supertest');
const { createApp } = require('../src/app');

describe('Task Tracker API', () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  test('GET / returns the welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Task Tracker API is running');
  });

  test('GET /health reports status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  test('GET /api/tasks starts with an empty list', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /api/tasks creates a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Write the DevOps report' });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 1, title: 'Write the DevOps report', done: false });
  });

  test('POST /api/tasks rejects a missing title', async () => {
    const res = await request(app).post('/api/tasks').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('title is required');
  });

  test('GET /api/tasks/:id returns a created task', async () => {
    await request(app).post('/api/tasks').send({ title: 'Record the video' });
    const res = await request(app).get('/api/tasks/1');
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Record the video');
  });

  test('GET /api/tasks/:id returns 404 for an unknown task', async () => {
    const res = await request(app).get('/api/tasks/999');
    expect(res.status).toBe(404);
  });
});
