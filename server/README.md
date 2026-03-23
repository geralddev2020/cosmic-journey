# Cosmic Journey (Backend)

Node.js + Express + TypeScript backend for Cosmic Journey App.

## 📦 Setup

### Prerequisites

- Node.js (v22)
- npm
- NASA's API Key

### Installation

```bash
npm install
```

### Environment Variables

Copy the **.env.example** file to **.env**: `cp ./.env.example ./.env`. Then, set your NASA API key: `NASA_API_KEY=your_api_key`

```bash
NASA_API_KEY=
CORS_ORIGIN=http://localhost:5173
PORT=3000
HOST=localhost
```

### Running the Application

**Development**

```bash
npm run dev
```

The API will be available at http://localhost:3000

**Build for Production**

```bash
npm run build
```

**Start Production Server**

```
npm start
```

**Testing**

```
npm test
```

### Project Structure
- src/: Source code
  - config/: App config
  - constants/: Constant values
  - controllers/: Request handlers
  - routes/: API routes
  - schema/: Data schema
  - services/: API integration
  - server.ts: Express app setup
  - main.ts: Application bootstrap
- .env: Env variables
- .nvmrc: Node version
- tsconfig.json: TypeScript config
- package.json: Project metadata and dependancies

### Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| npm run dev       | Start development server with tsdown |
| npm run build     | Compile TypeScript to JavaScript     |
| npm start         | Start production server              |
| npm test          | Run tests                            |
| npm run lint      | Check file linting with Oxlint       |
| npm run lint:fix  | Run linter                           |
| npm run fmt       | Run formatter                        |
| npm run fmt:check | Check file format with Oxfmt         |

### API Endpoints

| Method | Endpoint | Description   |
| ------ | -------- | ------------- |
| GET    | /health  | Health check  |
| GET    | /apod    | APOD Endpoint |


### Query Parameters for `/apod`

| Parameter    | Type       | Default | Description                                                                                                                 |
| ------------ | ---------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| `start_date` | YYYY-MM-DD | `none`  | The start of a date range, when requesting date for a range of dates. Cannot be used with `count`.                          |
| `end_date`   | YYYY-MM-DD | `none`  | The end of the date range, when used with `start_date`.                                                                     |
| `count`      | int        | `none`  | If this is specified then `count` randomly chosen images will be returned. Cannot be used with `start_date` and `end_date`. |
