# Remify <img src="https://img.shields.io/npm/v/remify.svg" alt="npm version"> <img src="https://img.shields.io/npm/l/remify.svg" alt="license"> <img src="https://img.shields.io/github/workflow/status/kaihere14/remindme/CI/main.svg" alt="build status">

**A lightweight, zero‑dependency Node.js library / CLI for creating, managing, and triggering reminders right from your terminal or within your JavaScript/TypeScript projects.**  

[Demo](#demo) • [Documentation](#documentation) • [Issues](https://github.com/kaihere14/remindme/issues) • [Pull Requests](https://github.com/kaihere14/remindme/pulls)

---

## Overview

Remify lets you schedule one‑off or recurring reminders with a simple, expressive API or via a convenient command‑line interface. Whether you need a quick “drink water” ping while coding or a programmatic reminder system for a larger application, Remify handles the timing, persistence, and notification for you.

* **Zero‑dependency** – pure CommonJS, works on any Node ≥12.
* **CLI & Library** – use it from the terminal or embed it in your code.
* **Cross‑platform** – works on Windows, macOS, and Linux.
* **Extensible** – plug in your own notification handler (console, email, Slack, etc.).

---

## Features

| Feature | Description | Status |
|---------|-------------|--------|
| **One‑off reminders** | Schedule a reminder to fire at a specific date/time. | ✅ Stable |
| **Recurring reminders** | Cron‑style recurring reminders (e.g., every day at 9 AM). | ✅ Stable |
| **Multiple notification channels** | Built‑in console output; custom handlers via callbacks. | ✅ Stable |
| **Persistence** | Optional JSON file persistence so reminders survive restarts. | ✅ Stable |
| **CLI commands** | `remify add`, `remify list`, `remify remove`, `remify start`. | ✅ Stable |
| **Time‑zone aware** | Uses the system’s time zone; can be overridden per reminder. | ✅ Stable |
| **Graceful shutdown** | Saves pending reminders on `SIGINT`/`SIGTERM`. | ✅ Stable |
| **TypeScript typings** | Full type definitions for a better developer experience. | ✅ Stable |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Node.js (CommonJS) |
| **Package Manager** | npm |
| **Language** | JavaScript (ES2020) |
| **Testing** | (to be added) |
| **CI** | GitHub Actions (placeholder badge) |
| **License** | ISC |

---

## Architecture

```
remify/
├─ src/
│  ├─ index.js          # Public API entry point
│  ├─ cli.js            # CLI command handling
│  ├─ scheduler.js      # Core scheduling engine (setTimeout / cron)
│  ├─ storage.js        # JSON file persistence layer
│  └─ notifier.js       # Built‑in console notifier + hook for custom notifiers
├─ lib/                 # Compiled output (if using Babel/TS)
├─ test/                # Test suite (Jest/Mocha – to be added)
└─ package.json
```

* **`index.js`** – Exposes `createReminder`, `listReminders`, `removeReminder`, and `startScheduler`.
* **`cli.js`** – Parses command‑line arguments with `process.argv` and forwards to the core API.
* **`scheduler.js`** – Manages timers, supports both absolute dates and cron expressions.
* **`storage.js`** – Reads/writes a `reminders.json` file in the user’s home directory.
* **`notifier.js`** – Default console logger; users can register a custom function `(reminder) => void`.

---

## Getting Started

### Prerequisites

| Requirement | Minimum Version |
|-------------|-----------------|
| **Node.js** | 12.0.0 |
| **npm**     | 6.0.0 |

### Installation

#### As a library (npm)

```bash
npm install remify
```

#### As a global CLI tool

```bash
npm install -g remify
```

### Verification

```bash
# Verify library installation
node -e "console.log(require('remify').version)"
# Verify CLI installation
remify --version
```

Both commands should output `1.0.0`.

---

## Configuration

Remify can be configured via environment variables or a `.remifyrc.json` file placed in the project root or the user’s home directory.

| Variable | Description | Default |
|----------|-------------|---------|
| `REMIFY_STORAGE_PATH` | Path to the JSON file used for persistence. | `~/.remify/reminders.json` |
| `REMIFY_TZ` | Default time‑zone (IANA string, e.g., `America/New_York`). | System time‑zone |
| `REMIFY_LOG_LEVEL` | `error`, `warn`, `info`, `debug`. | `info` |

**Example `.remifyrc.json`**

```json
{
  "storagePath": "/var/lib/remify/reminders.json",
  "tz": "Europe/Paris",
  "logLevel": "debug"
}
```

---

## Usage

### As a Library

```js
// index.js
const { createReminder, listReminders, startScheduler } = require('remify');

// Schedule a one‑off reminder
createReminder({
  id: 'drink-water',
  message: 'Time to drink water!',
  at: new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now
});

// Schedule a recurring reminder (every day at 9:00 AM)
createReminder({
  id: 'daily-standup',
  message: 'Daily stand‑up meeting',
  cron: '0 9 * * *' // cron expression
});

// Start the background scheduler (required for CLI‑less usage)
startScheduler();

console.log('Current reminders:', listReminders());
```

### As a CLI

```bash
# Add a one‑off reminder
remify add --id coffee --msg "Take a coffee break" --at "2024-02-15T15:30:00"

# Add a recurring reminder (every Monday at 10 AM)
remify add --id weekly-sync --msg "Weekly sync meeting" --cron "0 10 * * 1"

# List all scheduled reminders
remify list

# Remove a reminder
remify remove --id coffee

# Start the scheduler (keeps the process alive and fires reminders)
remify start
```

#### CLI Options Overview

| Command | Options | Description |
|---------|---------|-------------|
| `add`   | `--id <string>` (required) <br> `--msg <string>` (required) <br> `--at <ISO8601>` <br> `--cron <cron>` <br> `--tz <IANA>` | Create a new reminder. Either `--at` **or** `--cron` must be supplied. |
| `list`  | `--json` | Print reminders in JSON format. |
| `remove`| `--id <string>` (required) | Delete a reminder by its identifier. |
| `start` | `--port <number>` (optional) | Launch the scheduler daemon. |
| `help`  | — | Show help for a command. |

---

## Development

### Clone the repository

```bash
git clone https://github.com/kaihere14/remindme.git
cd remindme
```

### Install development dependencies

```bash
npm install
```

### Run the test suite (placeholder)

```bash
npm test
```

> **Note:** The test suite is currently a stub. Contributions that add unit/integration tests are highly encouraged.

### Code style

* Use **ESLint** with the `eslint:recommended` configuration.
* Follow the **Airbnb JavaScript** style guide (except where it conflicts with Node’s CommonJS module system).

### Debugging

```bash
# Enable verbose logging
export REMIFY_LOG_LEVEL=debug
node src/cli.js start
```

---

## Deployment

Remify is a pure Node.js package, so deployment is simply publishing to npm.

```bash
npm login
npm publish
```

For production environments that rely on the CLI daemon:

```bash
# Install globally on the target machine
npm install -g remify

# Run as a background service (systemd example)
cat <<EOF | sudo tee /etc/systemd/system/remify.service
[Unit]
Description=Remify reminder daemon
After=network.target

[Service]
ExecStart=$(which remify) start
Restart=on-failure
User=nobody
Environment=REMIFY_STORAGE_PATH=/var/lib/remify/reminders.json

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable remify
sudo systemctl start remify
```

---

## API Documentation

### `createReminder(options)`

Creates a new reminder.

| Parameter | Type | Description |
|-----------|------|-------------|
| `options.id` | `string` | Unique identifier for the reminder. |
| `options.message` | `string` | Text displayed when the reminder fires. |
| `options.at` | `Date \| string` | Absolute date/time (ISO‑8601 or `Date`). |
| `options.cron` | `string` | Cron expression for recurring reminders. |
| `options.tz` | `string` (optional) | IANA time‑zone for this reminder. |
| `options.persist` | `boolean` (default: `true`) | Whether to store the reminder on disk. |

**Returns:** `Promise<Reminder>` – resolves with the created reminder object.

### `listReminders([filter])`

Returns an array of all scheduled reminders. Optional `filter` can be an object `{ id?: string, active?: boolean }`.

### `removeReminder(id)`

Deletes a reminder by its `id`. Returns `true` if a reminder was removed, `false` otherwise.

### `startScheduler([options])`

Starts the internal timer loop. If the process exits (e.g., `Ctrl+C`), pending reminders are persisted automatically.

| Option | Type | Description |
|--------|------|-------------|
| `options.persistPath` | `string` | Override the storage path for this session. |

---

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository and **clone** your fork.
2. Create a feature branch: `git checkout -b feat/awesome-feature`.
3. Make your changes, ensuring the code passes linting (`npm run lint`) and any existing tests.
4. Add or update tests for new functionality.
5. Commit with a clear message: `git commit -m "feat: add recurring reminder support"`.
6. Push to your fork: `git push origin feat/awesome-feature`.
7. Open a **Pull Request** against the `main` branch.

### Development Workflow

| Step | Command |
|------|---------|
| Install dependencies | `npm install` |
| Run linter | `npm run lint` |
| Run tests | `npm test` |
| Build (if using Babel/TS) | `npm run build` |

### Code Review Guidelines

* Keep changes **atomic** – one feature or bug fix per PR.
* Ensure **unit tests** cover new code paths.
* Update **README** and **API docs** when public behavior changes.
* Follow the existing **coding style** and **naming conventions**.

---

## Troubleshooting & FAQ

| Problem | Solution |
|---------|----------|
| **Reminders don’t fire after a restart** | Ensure `REMIFY_STORAGE_PATH` points to a writable location and that the JSON file isn’t corrupted. |
| **Cron expression not recognized** | Use a valid 5‑field cron string (`minute hour day month weekday`). |
| **CLI shows “command not found”** | Verify that the global npm bin directory is in your `PATH` (`npm root -g`/`npm bin -g`). |
| **Time‑zone mismatch** | Set `REMIFY_TZ` or pass `tz` in the reminder options. |
| **Permission denied when persisting** | Run the CLI with a user that has write access to the storage path, or change the path via `--storagePath`. |

For additional help, open an issue or join the discussion in the repository’s **Discussions** tab.

---

## Roadmap

- **v1.1** – Add email and Slack notification adapters.
- **v1.2** – Introduce a web UI dashboard.
- **v2.0** – Full TypeScript rewrite with pluggable storage backends (SQLite, Redis).

---

## License & Credits

**License:** ISC – see the [LICENSE](LICENSE) file for details.

**Author:** *Kai Here* (maintainer of the `remify` package).  

**Contributors:** (add your name here when you submit a PR!)

**Acknowledgments**

- Thanks to the Node.js community for the robust `timers` and `fs` APIs.
- Badge icons provided by [shields.io](https://shields.io).

---