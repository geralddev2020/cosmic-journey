# Cosmic Journey (Frontend)

The frontend app built with React + TypeScript + Tanstack Query for Cosmic Journey.

## 📦 Setup

### Prerequisites

- Node.js (v22)
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy the **.env.example** file to .env: `cp ./.env.example ./.env`.

```bash
VITE_API_BASE_URL=http://localhost:3000
```

### Running the Application

#### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or your configured port).

### Build for Production

```bash
npm run build
```

Output will be in the dist/ folder.

### Preview Production Build

```bash
npm run preview
```

### Project Structure

- src/: Source code
  - assets/: App assets
  - components/: Reusable UI components
  - constants/: Global constants
  - features/: Feature-specific logic and components
  - lib/: Utility functions/modules
  - providers/: Context providers
  - schema/: Data schemas (APOD)
  - services/: API integration
  - store/: Zustand store
  - main.tsx: Application bootstrap
- .env: Env variables
- .nvmrc: Node version
- tsconfig.json: TypeScript config
- package.json: Project metadata & dependencies
- vite.config.ts: Vite configuration

### Available Scripts

| Command           | Description                |
| ----------------- | -------------------------- |
| npm run dev       | Start development server   |
| npm run build     | Build for production       |
| npm run fmt       | Run Oxfmt                  |
| npm run fmt:check | Check files for formatting |
| npm run preview   | Preview production build   |

### Configuration

#### TypeScript

TypeScript is configured in tsconfig.json. Ensure strict mode is enabled for better type safety.

#### Vite

See vite.config.ts for bundler configuration.
