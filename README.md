# Remify – Discord Reminder Bot  

![GitHub license](https://img.shields.io/github/license/kaihere14/remindme) ![GitHub package.json version](https://img.shields.io/github/package-json/v/kaihere14/remindme) ![GitHub issues](https://img.shields.io/github/issues/kaihere14/remindme) ![GitHub stars](https://img.shields.io/github/stars/kaihere14/remindme)  

**Remify** is a Discord bot that lets users create natural‑language reminders, stores them in MongoDB, and sends reminder emails via **Resend**. It uses **Groq’s OpenAI‑compatible API** to turn free‑form text into structured reminder data, handling one‑off, daily, and weekly recurrences.

> **Target audience** – Discord server owners and community managers who want a lightweight, AI‑enhanced reminder system without leaving Discord.

---

## Table of Contents  

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Architecture Overview](#architecture-overview)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Configuration](#configuration)  
  - [Running the Bot](#running-the-bot)  
- [Usage](#usage)  
  - [/reminder](#reminder)  
  - [/email](#email)  
  - [/change-email](#change-email)  
  - [/profile](#profile)  
  - [/list‑reminder](#list‑reminder)  
- [API Endpoints](#api-endpoints)  
- [Development](#development)  
  - [Running in Dev Mode](#running-in-dev-mode)  
  - [Testing](#testing)  
  - [Linting & Code Style](#linting--code-style)  
- [Deployment](#deployment)  
  - [Docker (optional)](#docker-optional)  
  - [Production Checklist](#production-checklist)  
- [Troubleshooting & FAQ](#troubleshooting--faq)  
- [Roadmap](#roadmap)  
- [Contributing](#contributing)  
- [License & Credits](#license--credits)  

---

## Features  

| Feature | Description | Status |
|---------|-------------|--------|
| **Natural‑language reminder creation** | Users type a free‑form sentence (e.g., “remind me to submit the report tomorrow at 9 am”) and the bot parses it via Groq’s LLM. | ✅ Stable |
| **Recurring reminders** | Supports `daily` and `weekly` repeats. | ✅ Stable |
| **Email notifications** | Sends reminder details to the user’s email using Resend. | ✅ Stable |
| **User profile** | Stores Discord ID, email, and timezone in MongoDB. | ✅ Stable |
| **List & manage reminders** | Commands to list upcoming reminders and delete/archieve them. | ✅ Stable |
| **Slash‑command deployment script** | `src/deploy-commands.ts` registers all commands with Discord automatically. | ✅ Stable |
| **API‑triggered scheduler** | An Express endpoint (`POST /api/cron`) runs the reminder‑dispatch logic on demand. | ✅ Stable |
| **Health‑check HTTP server** | A lightweight HTTP server listens on port 3000 and returns a simple health‑check response. | ✅ Stable |
| **TypeScript + ESLint** | Full type safety and linting for maintainability. | ✅ Stable |

---

## Tech Stack  

| Layer | Technology | Reason |
|-------|------------|--------|
| **Runtime** | Node.js (v20+) | Modern async I/O, wide ecosystem |
| **Language** | TypeScript 5.9 | Static typing, developer productivity |
| **Discord API** | `discord.js` v14 | Robust wrapper for Discord interactions |
| **LLM** | `openai` (Groq endpoint) | Fast, cost‑effective natural‑language parsing |
| **Database** | MongoDB (via `mongoose` v9) | Flexible schema for user & reminder data |
| **Email** | `resend` | Simple transactional email service |
| **Scheduling** | Express API (`POST /api/cron`) | Allows external cron services or manual invocation |
| **HTTP Server** | Express | Zero‑dependency health‑check & API endpoint |
| **Environment** | `dotenv` | Secure handling of secrets |
| **Linting** | ESLint + `@typescript-eslint` | Code quality enforcement |
| **Build** | TypeScript compiler (`tsc`) | Transpiles to JavaScript for production |
| **Dev Dependencies** | `@types/express`, `@typescript-eslint/eslint-plugin`, `@types/node`, `ts-node`, `eslint`, `typescript` | Type definitions & tooling for a smooth development experience |

---

## Architecture Overview  

```
src/
├─ commands/            # Discord slash‑command implementations
│   ├─ reminder.ts      # Core reminder creation flow
│   ├─ email.ts         # Set user email
│   ├─ change-email.ts  # Update stored email
│   ├─ profile.ts       # View / edit profile (timezone)
│   └─ listReminder.ts  # List upcoming reminders
├─ models/              # Mongoose schemas
│   ├─ reminder.model.ts
│   └─ user.models.ts
├─ utils/               # Helper modules
│   ├─ connectDb.ts     # MongoDB connection
│   ├─ cron.jobs.ts     # Scheduler logic (runs when invoked)
│   └─ email.resend.ts  # Wrapper around Resend API
├─ deploy-commands.ts   # Registers slash commands with Discord
├─ index.ts             # Bot bootstrap (client, command loader, HTTP server)
└─ ...                  # Miscellaneous TS config files
```

* **Command Loader** – `index.ts` reads every `*.ts` file in `src/commands`, validates the exported `data` (SlashCommandBuilder) and `execute` function, and registers them in a `Collection`.
* **Reminder Flow** – `/reminder` → LLM parsing → `Reminder` document → saved in MongoDB.
* **Scheduler** – Core reminder‑dispatch logic lives in `utils/cron.jobs.ts`. It is **not** run automatically; instead it is executed when the Express endpoint `POST /api/cron` is called. This design lets you use any external scheduler (e.g., a cloud cron service, Kubernetes CronJob, or a simple `curl` command) to trigger reminder processing at your desired frequency.
* **User Model** – Stores Discord ID, email, and timezone (used by the LLM prompt).
* **Health‑check & API Server** – An Express server starts on port 3000 when the bot boots. It provides:
  * `GET /` – health‑check (`{ "status": "ok" }`)
  * `POST /api/cron` – runs the reminder‑dispatch job on demand.

---

## Getting Started  

### Prerequisites  

| Tool | Minimum Version |
|------|-----------------|
| **Node.js** | 20.x |
| **npm** | 10.x (bundled with Node) |
| **MongoDB** | Any reachable instance (Atlas, local, etc.) |
| **Discord Application** | Bot token with `applications.commands` scope |
| **Groq API Key** | For LLM parsing (`GROQ_API_KEY`) |
| **Resend API Key** | For sending emails (`RESEND_API_KEY`) |

### Installation  

```bash
# 1️⃣ Clone the repository
git clone https://github.com/kaihere14/remindme.git
cd remindme

# 2️⃣ Install exact dependency versions (reproducible)
npm ci
```

> **Note:** The `build` script (`npm run build`) now runs `npm install` internally, so you can also skip the explicit `npm ci` step and go straight to `npm run build`. Running `npm ci` first is recommended for a clean, reproducible environment.

### Configuration  

Create a `.env` file in the project root:

```dotenv
# Discord
DISCORD_BOT_TOKEN=YOUR_DISCORD_BOT_TOKEN

# MongoDB
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/remify?retryWrites=true&w=majority

# Groq (OpenAI compatible)
GROQ_API_KEY=YOUR_GROQ_API_KEY

# Resend (email service)
RESEND_API_KEY=YOUR_RESEND_API_KEY

# Optional – default timezone for new users (IANA tz string, e.g., "America/New_York")
DEFAULT_TIMEZONE=UTC
```

> **Security note:** `.env` is already listed in `.gitignore`; never commit it.

### Running the Bot  

```bash
# Build the TypeScript source (installs deps if needed)
npm run build

# Register slash commands with Discord (run after any command change)
node dist/deploy-commands.js

# Start the bot (Discord client + Express HTTP server)
npm start
```

You should see output similar to:

```
Server started on port 3000
Ready! Logged in as <BotName>#1234
```

If the Discord client fails to log in (e.g., an invalid or missing `DISCORD_BOT_TOKEN`), the process will terminate and Node will output the underlying error stack trace.

#### Triggering the Scheduler  

The reminder‑dispatch logic is **not** scheduled internally. To actually send reminders you must call the endpoint, e.g.:

```bash
# Manual trigger (useful for testing)
curl -X POST http://localhost:3000/api/cron
```

In production, configure an external scheduler (cron, GitHub Actions, Kubernetes CronJob, etc.) to `POST` this endpoint at the desired frequency (e.g., every minute).

---

## Usage  

All interactions are via **Discord slash commands**. The bot must be invited to a server with the `applications.commands` and `bot` scopes.

### `/reminder`  

Create a new reminder.

| Option | Description | Required |
|--------|-------------|----------|
| `details` | Free‑form description of the task and timing (e.g., “remind me to water the plants every day at 8 am”) | ✅ |

**Example:**  

```
/reminder details: "Submit the quarterly report next Friday at 14:00"
```

The bot replies with a confirmation once the reminder is stored.

### `/email`  

Set the email address that reminders will be sent to.

| Option | Description | Required |
|--------|-------------|----------|
| `address` | Valid email address | ✅ |

### `/change-email`  

Update the stored email address (same options as `/email`).

### `/profile`  

View or update your profile (currently only timezone).

| Option | Description |
|--------|-------------|
| `timezone` *(optional)* | IANA timezone string (e.g., `Europe/Paris`). If omitted, the bot shows the current profile. |

### `/list-reminder`  

List all upcoming reminders for the invoking user. No options required. The bot responds with an embed showing title, scheduled time, and repeat mode.

---

## API Endpoints  

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | `GET` | Health‑check; returns `{ "status": "ok" }`. |
| `/api/cron` | `POST` | Triggers the reminder‑dispatch job. Should be called by an external scheduler (e.g., every minute) or manually for testing. |

**Manual trigger example:**

```bash
curl -X POST http://localhost:3000/api/cron
```

---

## Development  

### Running in Dev Mode  

```bash
npm run dev
```

* `ts-node src/index.ts` runs the bot directly from source (includes the Express server).  
* `ts-node src/utils/cron.jobs.ts` can be executed independently to test the scheduler logic.

Both processes use the same `.env` configuration.

### Testing  

The repository currently contains no automated tests. To add tests:

1. Install a test runner (e.g., Jest).  
2. Create `__tests__` directories alongside source files.  
3. Update the `test` script in `package.json` and run `npm test`.

### Linting & Code Style  

```bash
# Lint the entire project
npx eslint . --ext .ts
```

The project uses **ESLint** with the `@typescript-eslint` plugin. Adjust rules in `eslint.config.ts` as needed.

---

## Deployment  

### Docker (optional)  

A Dockerfile is not shipped, but you can containerize the bot quickly:

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --production
CMD ["node", "dist/index.js"]
```

Build & run:

```bash
docker build -t remify .
docker run -d --env-file .env -p 3000:3000 remify
```

### Production Checklist  

- [ ] Set `NODE_ENV=production`.  
- [ ] Use a process manager (PM2, systemd, Docker, etc.) to keep the bot alive.  
- [ ] Enable TLS/SSL for MongoDB connections.  
- [ ] Rotate API keys periodically.  
- [ ] Forward logs to a monitoring service (e.g., Logtail, Papertrail).  
- [ ] Configure an external cron service (or Kubernetes CronJob) to `POST http://<host>:3000/api/cron` at the desired interval.  
- [ ] Optionally place the health‑check endpoint behind a reverse proxy for added security.  

---

## Troubleshooting & FAQ  

| Issue | Solution |
|-------|----------|
| **Bot fails to start – “No token provided”** | Verify `DISCORD_BOT_TOKEN` is present in `.env`. |
| **Bot exits with an error on login** | Check that the token is correct and that the bot has the required scopes. The login promise rejection will cause the process to terminate, displaying the error stack. |
| **Reminders never fire** | Ensure the `/api/cron` endpoint is being called (e.g., by an external scheduler). Check MongoDB connection and that `remindAt` dates are in the future. |
| **Emails not delivered** | Verify `RESEND_API_KEY` and that the `from` address is configured in your Resend dashboard. Check Resend’s activity logs for rejected messages. |
| **LLM returns invalid JSON** | The bot strips code fences before parsing. If parsing still fails, re‑phrase the reminder. |
| **Timezone is wrong** | Use `/profile timezone:<IANA_TZ>` to set the correct timezone. |
| **Command not recognized** | Run `node dist/deploy-commands.js` again to (re)register slash commands. |
| **Health endpoint returns non‑200** | Ensure the process is running and listening on port 3000. Check for port conflicts or firewall blocks. |
| **Cron endpoint returns 500** | Inspect server logs for the error stack. Common causes are MongoDB connectivity issues or missing environment variables. |

For additional help, open an issue on GitHub or join the project's Discord (link in the repo description).

---

## Roadmap  

- **v2.0** – Support custom reminder channels (DM vs. server channel).  
- **Web Dashboard** – Simple UI to view, edit, and delete reminders.  
- **Advanced Recurrence** – Monthly, weekdays‑only, and custom cron‑style patterns.  
- **Testing Suite** – Unit & integration tests targeting >80 % coverage.  
- **Docker Compose** – Include a MongoDB service for local development.  

---

## Contributing  

We welcome contributions! Follow these steps:

1. **Fork** the repository.  
2. **Create a feature branch**: `git checkout -b feat/awesome-feature`.  
3. **Install dependencies** (`npm ci`) and set up a `.env` file.  
4. **