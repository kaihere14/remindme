# Remify <img src="https://img.shields.io/npm/v/remify.svg" alt="npm version"> <img src="https://img.shields.io/npm/l/remify.svg" alt="license"> <img src="https://img.shields.io/github/workflow/status/kaihere14/remindme/CI/main.svg" alt="build status">

**A Discord bot that lets users create, list, and manage AI‑parsed reminders directly from chat.**  

[Demo](#demo) • [Documentation](#documentation) • [Issues](https://github.com/kaihere14/remindme/issues) • [Pull Requests](https://github.com/kaihere14/remindme/pulls)

---

## Overview

Remify bridges Discord and your personal schedule. Users can type a natural‑language reminder request, and the bot (powered by Groq’s Llama‑3.3 model) extracts the title, date, time, and recurrence automatically. Reminders are stored in MongoDB, can be listed at any time, and are sent to the user’s registered email address when they fire.

* **AI‑driven parsing** – No need to remember a strict command syntax.  
* **Persistent storage** – MongoDB keeps reminders across restarts.  
* **Email notifications** – Optional email delivery via user‑provided address.  
* **Fully typed** – Written in TypeScript for safety and IDE support.  

Target audience: Discord server owners who want a lightweight, self‑hosted reminder system for their community.

Current version: **1.0.0**

---

## Features

| Feature | Description | Status |
|---------|-------------|--------|
| **Natural‑language reminder creation** | ` /reminder details:"Buy milk tomorrow at 9am"` – AI extracts title, time, repeat. | ✅ Stable |
| **List active reminders** | ` /list‑reminder` – Shows a nicely formatted embed of all pending reminders. | ✅ Stable |
| **Email registration** | ` /email email:<address> timezone:<IANA>` – Stores user’s email & timezone. | ✅ Stable |
| **Change email** | ` /change-email email:<new‑address>` – Updates the stored email for the user and all of their existing reminders. | ✅ Stable |
| **View profile** | ` /profile` – Displays the user’s email, timezone, reminder count, recent reminders, and join date. | ✅ Stable |
| **Reminder archiving** | Reminders are automatically archived after they fire. | ✅ Stable |
| **MongoDB persistence** | All reminders & user profiles survive bot restarts. | ✅ Stable |
| **Extensible command set** | New slash commands can be added in `src/commands`. | ✅ Stable |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Node.js (v20+) |
| **Language** | TypeScript |
| **Discord API** | `discord.js` v14 |
| **AI parsing** | `openai` (Groq endpoint) |
| **Database** | MongoDB via `mongoose` |
| **Configuration** | `dotenv` |
| **Linting** | ESLint with custom `eslint.config.ts` |
| **Package manager** | npm |

---

## Architecture

```
remify/
├─ src/
│  ├─ commands/
│  │  ├─ change-email.ts   # Update stored email address
│  │  ├─ email.ts          # Register user email & timezone
│  │  ├─ listReminder.ts   # List active reminders (embed)
│  │  ├─ profile.ts        # View user profile & recent reminders
│  │  └─ reminder.ts       # AI‑parsed reminder creation
│  ├─ deploy-commands.ts   # Registers slash commands with Discord
│  ├─ index.ts             # Bot entry point, command loader, error handling
│  ├─ utils/
│  │  ├─ connectDb.ts      # MongoDB connection helper
│  │  └─ cron.jobs.ts      # Background scheduler that fires reminders (runs as a cron job)
│  └─ models/
│     ├─ reminder.model.ts # Mongoose schema for reminders
│     └─ user.models.ts    # Mongoose schema for user profiles
├─ .env.example            # Sample environment variables
├─ eslint.config.ts        # ESLint rules
├─ package.json
└─ tsconfig.json
```

* **`index.ts`** – Connects to MongoDB, loads commands, and starts the Discord client.  
* **`cron.jobs.ts`** – Contains the background scheduler that checks for due reminders and logs a startup message when the process begins. This file is now launched automatically alongside the bot via the updated `start` and `dev` scripts.  
* **`deploy-commands.ts`** – One‑off script to register all slash commands globally or per guild.  
* **`models/`** – Mongoose schemas that define the data shape for reminders and users.  
* **`utils/connectDb.ts`** – Centralised MongoDB connection with error handling.  

---

## Getting Started

### Prerequisites

| Requirement | Minimum version |
|-------------|-----------------|
| **Node.js** | 20.0.0 |
| **npm** | 10.0.0 |
| **MongoDB** | 5.0 (cloud Atlas or local) |
| **Discord Bot Token** | Create a bot in the Discord Developer Portal |
| **Groq API Key** | Sign‑up at https://groq.com/ for `GROQ_API_KEY` |

### Installation

```bash
# Clone the repository
git clone https://github.com/kaihere14/remindme.git
cd remindme

# Install dependencies
npm install
```

### Configuration

Create a `.env` file at the project root (copy from `.env.example`):

```dotenv
# Discord
DISCORD_BOT_TOKEN=your-discord-bot-token

# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/remify?retryWrites=true&w=majority

# Groq (AI parsing)
GROQ_API_KEY=your-groq-api-key

# Optional defaults
DEFAULT_TIMEZONE=UTC
```

**`.env.example`**

```dotenv
DISCORD_BOT_TOKEN=
MONGODB_URI=
GROQ_API_KEY=
DEFAULT_TIMEZONE=UTC
```

### Build & Run

```bash
# Compile TypeScript
npm run build
```

#### Production

```bash
# Register slash commands (run once or after adding new commands)
npm run deploy

# Start the bot **and** the background cron scheduler
npm start
```

#### Development

```bash
# Runs the bot and the cron scheduler concurrently using ts-node
npm run dev
```

> **Note:** The `start` and `dev` scripts now launch **both** the Discord client (`index.ts`) **and** the reminder scheduler (`cron.jobs.ts`) in parallel, ensuring reminders are processed even while you are developing.

---

## Usage (Discord)

All interactions are performed via **slash commands**.

| Command | Options | Description |
|---------|---------|-------------|
| `/reminder` | `details` (string, required) | Natural‑language description of the reminder (e.g., “Submit report tomorrow at 5 pm daily”). |
| `/list‑reminder` | — | Shows an embed with all active reminders for the invoking user. |
| `/email` | `email` (string, required) `timezone` (string, optional) | Saves the user’s email address and optional IANA timezone for future reminders. |
| `/change-email` | `email` (string, required) | Updates the stored email address for the user and propagates the change to all of their existing reminders. |
| `/profile` | — | Displays the user’s profile: email, timezone, total reminders, recent reminders, and join date. |

### Example Flow

1. **Register your email**  

   `/email email:you@example.com timezone:America/New_York`

2. **Create a reminder**  

   `/reminder details:"Buy groceries tomorrow at 10am"`  

   The bot replies “✅ Reminder set successfully!” and stores the reminder.

3. **List your reminders**  

   `/list-reminder` – receives an embed with titles, dates, repeat status, and email target.

4. **Update your email**  

   `/change-email email:newaddress@example.com` – all future and existing reminders will now use the new address.

5. **View your profile**  

   `/profile` – shows a summary of your stored information and recent reminders.

---

## API Documentation (Bot Commands)

### `/reminder`

**Parameters**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `details` | string | ✅ | Free‑form description of the task and timing (e.g., “Call Mom next Monday at 7 pm”). |

**Behaviour**  
The bot sends the description to Groq’s Llama‑3.3 model, which returns a JSON payload:

```json
{
  "title": "Call Mom",
  "remindAt": "2024-09-02T19:00:00.000Z",
  "repeat": "none"
}
```

The bot stores the reminder, links it to the user’s Discord ID and email (if set), and replies with a success message.

### `/list-reminder`

No parameters. Returns an embed containing:

* Index number  
* Title  
* When (absolute date + relative time)  
* Type (once / daily / weekly)  
* Status (Pending / Sent)  
* Email target

### `/email`

**Parameters**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `email` | string | ✅ | Valid email address for notifications. |
| `timezone` | string | ❌ | IANA timezone (e.g., `Europe/Paris`). Defaults to `DEFAULT_TIMEZONE` env var. |

Stores the data in the `users` collection.

### `/change-email`

**Parameters**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `email` | string | ✅ | New email address to replace the existing one. |

Updates the `email` field in the user profile and propagates the change to every reminder document belonging to the user.

### `/profile`

No parameters. Returns an embed with:

* Email  
* Timezone  
* Total number of reminders  
* A list of up to 5 most recent reminder titles  
* Account creation date  

---

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository and **clone** your fork.  
2. Create a feature branch: `git checkout -b feat/awesome-feature`.  
3. Install dependencies (`npm install`) and make your changes.  
4. Ensure the code passes linting (`npm run lint`).  
5. (Optional) Add tests for new functionality.  
6. Commit with a clear message, e.g., `feat: add weekly reminder command`.  
7. Push to your fork and open a **Pull Request** against `main`.

### Development Workflow

| Step | Command |
|------|---------|
| Install dependencies | `npm install` |
| Run the bot in dev mode (bot + cron) | `npm run dev` |
| Build production bundle | `npm run build` |
| Deploy slash commands | `npm run deploy` |
| Lint | `npm run lint` |

### Code Review Guidelines

* Keep PRs focused on a single feature or bug fix.  
* Write clear commit messages.  
* Update the README (or other docs) when you change public behaviour.  
* Follow the existing TypeScript and ESLint conventions.

---

## Troubleshooting & FAQ

| Problem | Solution |
|---------|----------|
| **Bot fails to start – missing token** | Ensure `DISCORD_BOT_TOKEN` is set in `.env`. |
| **Reminders never fire** | Verify `MONGODB_URI` is correct and the bot can write to the `reminders` collection. |
| **AI parsing returns errors** | Check that `GROQ_API_KEY` is valid and you have sufficient quota. |
| **Email not sent** | The current implementation only stores the email; you’ll need to integrate an email service (e.g., Nodemailer). |
| **Slash commands not appearing** | Run `npm run deploy` again; it may take a few minutes for Discord to propagate changes. |
| **Time‑zone issues** | Set `DEFAULT_TIMEZONE` in `.env` or provide a timezone when registering your email. |
| **Cron scheduler not starting** | The startup log “Cron jobs initialized” appears in the console when `npm start` or `npm run dev` is executed. If you don’t see it, ensure you are using the latest scripts (`npm run start` / `npm run dev`). |

For additional help, open an issue or join the discussion in the repository’s **Discussions** tab.

---

## Roadmap

- **v1.1** – Add email delivery via Nodemailer.  
- **v1.2** – Introduce a `/remindme` dashboard command with pagination.  
- **v2.0** – Full plugin system for alternative notification channels (Slack, SMS).  

---

## License & Credits

**License:** ISC – see the [LICENSE](LICENSE) file for details.

**Author:** *Kai Here* (maintainer of the `remify` package).  

**Contributors:** (add your name here when you submit a PR!)

**Acknowledgments**

- `discord.js` – powerful Discord API library.  
- Groq – for the fast Llama‑3.3 inference endpoint.  
- Badge icons provided by [shields.io](https://shields.io).