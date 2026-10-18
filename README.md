# DevOps CI Demo - Task Tracker API

![CI](https://github.com/YOUR-USERNAME/YOUR-REPO/actions/workflows/main.yml/badge.svg)

A small Node.js + Express API used to demonstrate an **automated build and testing pipeline with GitHub Actions**.

## Run locally

```bash
npm install
npm test
npm start      # http://localhost:3000
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Welcome message |
| GET | `/health` | Health check |
| GET | `/api/tasks` | List tasks |
| GET | `/api/tasks/:id` | Get one task |
| POST | `/api/tasks` | Create a task (`{ "title": "..." }`) |

## CI pipeline

The workflow in `.github/workflows/main.yml` runs on every push to `main` and on every pull request into `main`.
It checks out the code, installs Node.js, runs `npm ci`, and then `npm test`.

Pipeline demo run
Testing CI again