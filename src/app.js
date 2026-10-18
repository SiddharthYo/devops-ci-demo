const express = require('express');
const { createTaskStore } = require('./taskStore');

// The app is created by a function so that tests can get a fresh copy every time.
function createApp(store = createTaskStore()) {
  const app = express();
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ message: 'Task Tracker API is running' });
  });

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/api/tasks', (req, res) => {
    res.json(store.list());
  });

  app.get('/api/tasks/:id', (req, res) => {
    const task = store.get(Number(req.params.id));
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  });

  app.post('/api/tasks', (req, res) => {
    const title = req.body && req.body.title;
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'title is required' });
    }
    res.status(201).json(store.add(title));
  });

  return app;
}

module.exports = { createApp };
