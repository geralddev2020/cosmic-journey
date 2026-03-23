# Cosmic Journey App

A full-stack application built with React, TypeScript, Node.js, and Express. Cosmic Journey fetches astronomical imagery from NASA's APOD (Astronomy Picture of the Day) API, transforms the data, and presents stunning celestial content to users.

Explore the cosmos through NASA's curated space imagery - one picture at a time.

## Architecture

This repository follows a simple structure with separate folders for the frontend and backend:

```bash
- client/         # Frontend
- server/         # Backend
- README.md       # This file
```

### Quick Start

#### Prerequisites

- Node.js (v22)
- npm
- Git
- API Key from [NASA APIs](https://api.nasa.gov/#signUp)

#### Installation

1. Clone the repository:

```bash
git clone https://github.com/geralddev2020/cosmic-journey
cd cosmic-journey
```

2. Install dependencies for both folders:

```bash
cd client && npm install && cd ..
cd server && npm install && cd ..
```

3. Configure environment variables (see each folder's README for details)
4. Start the development servers:

```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

---

### Documentation

- [Frontend Documentation](client/README.md)
- [Backend Documentation](server/README.md)

### Tech Stack

| Layer             | Technology                                      | Deployment Service |
| ----------------- | ----------------------------------------------- | ------------------ |
| Frontend (client) | React, TypeScript, Tanstack Query, Zod, Zustand | Netlify            |
| Backend (server)  | Node.js, Express, TypeScript, Zod               | Railway.app        |
