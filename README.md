# RemindMe Bot & Dashboard  

![GitHub license](https://img.shields.io/github/license/kaihere14/remindme) ![Node.js version](https://img.shields.io/badge/node-%3E%3D20-brightgreen) ![Server version](https://img.shields.io/badge/server-1.0.0-blue) ![Client version](https://img.shields.io/badge/client-0.1.0-blue)  

**RemindMe** is a Discord‑integrated reminder service backed by a lightweight Express API and a modern Next.js dashboard. Users can create, list, and delete reminders directly from Discord slash‑commands, while the web UI offers a visual overview of upcoming reminders, settings, and analytics.

> **Demo**: (add link to Vercel/Heroku demo) | **Issues**: <https://github.com/kaihere14/remindme/issues> | **Docs**: (add link if you generate separate docs)

---

## Table of Contents  

- [Overview](#overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Architecture](#architecture)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation & Setup](#installation--setup)  
  - [Configuration](#configuration)  
  - [Running the Project](#running-the-project)  
- [Usage](#usage)  
  - [Discord Commands](#discord-commands)  
  - [Web Dashboard](#web-dashboard)  
  - [API Endpoints](#api-endpoints)  
- [Development](#development)  
  - [Running Tests](#running-tests)  
  - [Linting & Formatting](#linting--formatting)  
- [Deployment](#deployment)  
  - [Docker (optional)](#docker-optional)  
  - [Vercel / Render / Railway](#vercel--render--railway)  
- [Contributing](#contributing)  
- [Roadmap](#roadmap)  
- [Troubleshooting & FAQ](#troubleshooting--faq)  
- [License & Credits](#license--credits)  

---

## Overview  

RemindMe lets Discord community members schedule one‑off or recurring reminders without leaving the chat. A small Express server stores reminders in MongoDB, runs a cron job that checks for due reminders, and sends them back to Discord (or via email using Resend). A Next.js front‑end provides a clean dashboard where users can view, edit, and delete their reminders.

**Why use RemindMe?**  

- No external bots required – self‑hosted and fully customizable.  
- Supports rich reminder content (text, embed, optional OpenAI‑generated suggestions).  
- Unified web UI for quick overview and bulk management.  

---

## Features  

| Feature | Description | Status |
|---------|-------------|--------|
| **Discord slash commands** | `/remind`, `/list`, `/cancel`, `/help` – create and manage reminders directly from Discord. | ✅ Stable |
| **Cron‑based delivery** | A background job runs every minute, checks MongoDB, and dispatches due reminders. | ✅ Stable |
| **MongoDB persistence** | All reminders are stored in a MongoDB collection, enabling durability across restarts. | ✅ Stable |
| **Email notifications** | Optional email delivery via Resend for users who prefer out‑of‑Discord alerts. | 🟡 Beta |
| **OpenAI suggestion helper** | Generates friendly reminder titles or content using the OpenAI API. | 🟡 Experimental |
| **Web dashboard** | Next.js + Tailwind UI shows upcoming reminders, allows editing, and visualizes usage stats. | ✅ Stable |
| **Docker support** | Official Dockerfile for both server and client (see Deployment). | 🟡 Planned |
| **Multi‑guild support** | Reminders are scoped per Discord guild (server). | ✅ Stable |
| **Rate‑limit safety** | Built‑in handling for Discord API rate limits. | ✅ Stable |

---

## Tech Stack  

| Layer | Technology | Reason |
|-------|------------|--------|
| **Runtime** | Node.js (>=20) | Modern JavaScript features, async/await, excellent ecosystem. |
| **Language** | TypeScript | Type safety across server & client. |
| **Discord Bot** | discord.js v14 | Full support for Discord API & slash commands. |
| **Web Server** | Express 5 | Minimalist HTTP API for health checks & cron trigger. |
| **Database** | MongoDB (via Mongoose) | Document‑oriented storage, easy schema evolution. |
| **AI** | OpenAI SDK | Optional content generation for reminders. |
| **Email** | Resend SDK | Simple transactional email delivery. |
| **Front‑end** | Next.js 16 (React 19) | Server‑side rendering, API routes, fast dev experience. |
| **Styling** | Tailwind CSS 4, Radix UI, lucide-react | Utility‑first styling + accessible UI primitives. |
| **Utilities** | clsx, class-variance-authority, tailwind‑merge | Conditional class handling. |
| **Dev Tools** | ESLint, TypeScript, Biome, ts-node, tsc | Linting, type‑checking, fast builds. |
| **Containerisation** | Docker (optional) | Consistent runtime across environments. |

---

## Architecture  

```
root
├─ server/                # Discord bot + Express API
│   ├─ src/
│   │   ├─ commands/      # Slash command definitions (data + execute)
│   │   ├─ utils/
│   │   │   ├─ cron.jobs.ts   # Minute‑based reminder dispatcher
│   │   │   └─ connectDb.ts   # Mongoose connection helper
│   │   └─ index.ts       # Bot bootstrap, Express server, health endpoint
│   └─ package.json
│
├─ client/                # Next.js dashboard
│   ├─ app/
│   │   ├─ layout.tsx
│   │   └─ page.tsx       # Landing page (Hero, Navbar, etc.)
│   ├─ component/         # Re‑usable UI components (HeroSection, Navbar, …)
│   ├─ lib/
│   │   └─ utils.ts       # Shared client utilities
│   └─ package.json
│
└─ .env.example           # Template for required environment variables
```

* **Server** boots the Discord client, registers slash commands from `src/commands`, connects to MongoDB, and starts an Express HTTP server exposing a health check (`/`) and a manual cron trigger (`/api/cron`).  
* **Cron job** (`runCronJob`) runs every minute, queries the `reminders` collection, and sends due reminders back to Discord (or email).  
* **Client** is a stateless Next.js app that talks to the same MongoDB (via a future API layer) to fetch and manipulate reminders. It uses Tailwind for styling and Radix UI for accessible components.

---

## Getting Started  

### Prerequisites  

| Tool | Minimum version |
|------|-----------------|
| Node.js | 20.x |
| npm (or Yarn) | 9.x |
| MongoDB | 6.x (local or Atlas) |
| Discord account | — (to create a bot token) |
| (Optional) OpenAI API key | — |
| (Optional) Resend API key | — |

### Installation & Setup  

```bash
# 1️⃣ Clone the repo
git clone https://github.com/kaihere14/remindme.git
cd remindme

# 2️⃣ Create a .env file (see .env.example)
cp .env.example .env
# Edit .env with your own values (see Configuration section)

# 3️⃣ Install server dependencies
cd server
npm ci          # clean install
# (or `npm install` if you prefer)

# 4️⃣ Install client dependencies
cd ../client
npm ci
```

### Configuration  

Create a `.env` file in the **root** of the repository (or separate `.env` files inside `server/` and `client/` if you prefer). Example:

```dotenv
# Discord
DISCORD_BOT_TOKEN=YOUR_DISCORD_BOT_TOKEN
DISCORD_CLIENT_ID=YOUR_APPLICATION_CLIENT_ID   # needed for command deployment

# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster0.mongodb.net/remindme?retryWrites=true&w=majority

# OpenAI (optional)
OPENAI_API_KEY=sk-...

# Resend (optional – email notifications)
RESEND_API_KEY=re_...

# Server
PORT=3300
```

* `DISCORD_BOT_TOKEN` – Bot token from the Discord Developer Portal.  
* `DISCORD_CLIENT_ID` – Application (client) ID; used by the deployment script to register slash commands.  
* `MONGODB_URI` – Connection string for your MongoDB instance.  
* `OPENAI_API_KEY` – Enables AI‑generated reminder suggestions.  
* `RESEND_API_KEY` – Enables email delivery of reminders.  

### Running the Project  

#### Server (Discord bot + API)

```bash
# From the repository root
cd server

# Development (auto‑restarts with ts-node)
npm run dev

# Build for production
npm run build   # compiles to ./dist
npm start       # runs compiled JS
```

The server will:

1. Connect to MongoDB.  
2. Log in to Discord.  
3. Expose:
   * `GET /` – health check (`RemindMe Bot is running`).  
   * `GET /api/cron` – manually trigger the reminder cron job (useful for testing).

#### Deploying Slash Commands  

```bash
# Still inside ./server
npm run deploy   # registers/updates all commands defined in src/commands
```

> **Tip:** Run `npm run deploy` each time you add or modify a command.

#### Client (Next.js dashboard)

```bash
cd ../client
npm run dev      # http://localhost:3000
```

For production:

```bash
npm run build
npm start        # starts the optimized Next.js server
```

---

## Usage  

### Discord Commands  

| Command | Description | Example |
|---------|-------------|---------|
| `/remind` | Schedule a reminder. | `/remind message:"Take a break" when:"10m"` |
| `/list` | List all upcoming reminders for the current guild. | `/list` |
| `/cancel` | Cancel a reminder by its ID or index. | `/cancel id:1234567890` |
| `/help` | Show a quick help message with all commands. | `/help` |

> **Note:** The exact options (`message`, `when`, etc.) are defined in `src/commands/*`. Run `/help` in Discord to see the latest syntax.

### Web Dashboard  

Visit `http://localhost:3000` (or your deployed URL) to:

* **View** a table of upcoming reminders (sorted by due date).  
* **Edit** or **delete** reminders with a single click.  
* **Create** new reminders via a modal form (mirrors the Discord command).  
* **Toggle** email notifications or AI‑suggested titles.

### API Endpoints  

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/` | Simple health check – returns `"RemindMe Bot is running"` |
| `GET` | `/api/cron` | Triggers the cron job manually (returns status message). |
| *(Future)* | `GET /api/reminders` | List reminders for the authenticated user/guild. |
| *(Future)* | `POST /api/reminders` | Create a reminder via HTTP (used by the dashboard). |
| *(Future)* | `PATCH /api/reminders/:id` | Update a reminder. |
| *(Future)* | `DELETE /api/reminders/:id` | Delete a reminder. |

All future API routes will be protected by a simple JWT token generated from the Discord OAuth flow (not yet implemented).

---

## Development  

### Running Tests  

> No test suite is currently provided. Feel free to add Jest/Mocha tests under `server/tests` or `client/tests` and run them with `npm test`.

### Linting & Formatting  

```bash
# Server
cd server
npm run lint   # runs ESLint (configured via eslint.config.ts)

# Client
cd ../client
npm run lint   # runs ESLint (configured via eslint.config.mjs)
```

### Code Style  

* Use **Prettier** (via Biome) for formatting.  
* Follow the existing folder conventions (`src/commands`, `src/utils`, `app/` for Next.js).  
* Export default for command modules, but also support `module.exports` for compatibility.

### Debugging  

* The server logs the Discord client’s ready state and any command execution errors.  
* Use `DEBUG=discord:*` environment variable to enable discord.js debug output.  
* For cron debugging, hit `GET /api/cron` and watch the console for processed reminders.

---

## Deployment  

### Docker (optional)  

A minimal Dockerfile can be added for each service. Example for the server:

```dockerfile
# server/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY server/package*.json ./
RUN npm ci
COPY server/ .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
ENV NODE_ENV=production
RUN npm ci --omit=dev
CMD ["node", "dist/index.js"]
```

Build & run:

```bash
docker build -t remindme-server ./server
docker run -d -p 3300:3300 --env-file .env remindme-server
```

A similar Dockerfile can be created for the Next.js client (`next build && next start`).

### Vercel / Render / Railway  

* **Client** – Deploy the `client/` folder directly (Vercel auto‑detects Next.js).  
* **Server** – Deploy the `server/` folder as a Node service; ensure the build command is `npm run build` and the start command is `npm start`. Set the same environment variables in the platform’s dashboard.

---

## Contributing  

We welcome contributions! Please follow these steps:

1. **Fork** the repository and **clone** your fork.  
2. Create a feature branch: `git checkout -b feat/awesome-feature`.  
3. Make your changes, ensuring TypeScript compiles (`npm run build`) and lint passes (`npm run lint`).  
4. Write or update documentation/comments where appropriate.  
5. Open a **Pull Request** against `main`.  
6. PRs will be reviewed by the maintainers; please address any feedback promptly.

### Development Workflow  

| Command | Purpose |
|---------|---------|
| `npm run dev` (in `server/`) | Starts the bot with ts-node (auto‑restarts on file changes). |
| `npm run lint` | Runs ESLint. |
| `npm run build` | Compiles TypeScript to `dist/`. |
| `npm test` | Placeholder – add your test runner here. |

### Code Review Guidelines  

* Keep the codebase **type‑safe** – avoid `any` unless absolutely necessary.  
* Prefer **named exports** for utilities; default export only for command modules.  
* Add JSDoc comments for public functions.  
* Ensure any new environment variables are documented in this README and added to `.env.example`.

---

## Roadmap  

- [ ] Docker Compose file for local multi‑service development.  
- [ ] Full REST API for the dashboard (CRUD reminders).  
- [ ] Email notification toggle per reminder.  
- [ ] OpenAI‑powered reminder suggestion UI.  
- [ ] Unit & integration test suite (Jest + Supertest).  
- [ ] Internationalization (i18n) for Discord responses and UI.  

---

## Troubleshooting & FAQ  

**Q: Bot says “No token provided”.**  
A: Ensure `DISCORD_BOT_TOKEN` is defined in your `.env` and that the file is loaded (the server reads `process.env`).  

**Q: Commands don’t appear in Discord.**  
A: Run `npm run deploy` from the `server/` directory after any change to command definitions. It may take a few minutes for Discord to propagate.  

**Q: Reminders are never sent.**  
A: 1️⃣ Verify MongoDB connection (`connectDB` logs success). 2️⃣ Check the cron endpoint (`GET /api/cron`) – it should return “Cron job executed successfully”. 3️⃣ Look at the server console for any errors while sending messages.  

**Q: I get “Rate limit exceeded” errors.**  
A: The bot already respects Discord rate limits, but if you’re spamming commands, wait a few seconds between calls.  

**Q: