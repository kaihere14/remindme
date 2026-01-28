# RemindMe Bot 🔔

A smart Discord bot that helps you set and manage reminders effortlessly. Just describe your reminder in natural language, and RemindMe handles the rest — powered by AI to understand your intent without complex commands.

## ✨ Features

- **Natural Language Processing** - Uses AI (Groq/OpenAI) to parse your reminder requests naturally
- **Multiple Reminder Types** - Support for one-time, daily, and weekly recurring reminders
- **Multi-Channel Notifications** - Get reminded via both Discord DM and email
- **User Profiles** - Manage your email, timezone, and view reminder statistics
- **Beautiful Email Templates** - Professionally designed reminder emails via Resend

## 🛠️ Tech Stack

### Server

- **Runtime**: Node.js with TypeScript
- **Discord**: discord.js v14
- **Database**: MongoDB with Mongoose
- **AI**: Groq API (OpenAI-compatible)
- **Email**: Resend
- **Web Server**: Express.js

### Client (Landing Page)

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI, Lucide Icons
- **Language**: TypeScript

## 📁 Project Structure

```
remindme/
├── client/                 # Next.js landing page
│   ├── app/               # App router pages
│   ├── component/         # Custom components
│   └── components/ui/     # shadcn/ui components
│
└── server/                # Discord bot backend
    └── src/
        ├── commands/      # Slash command handlers
        ├── models/        # Mongoose schemas
        └── utils/         # Utilities (cron, email, db)
```

## 🤖 Bot Commands

| Command            | Description                                       |
| ------------------ | ------------------------------------------------- |
| `/email`           | Set your email address for receiving reminders    |
| `/change-email`    | Update your email address                         |
| `/reminder`        | Create a new reminder (supports natural language) |
| `/delete-reminder` | Delete an existing reminder by title              |
| `/list-reminder`   | View all your active reminders                    |
| `/profile`         | View your profile and reminder statistics         |
| `/help`            | Show all available commands                       |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance
- Discord Bot Token
- Groq API Key
- Resend API Key

### Environment Variables

Create a `.env` file in the `server/` directory:

```env
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_CLIENT_ID=your_discord_client_id
MONGODB_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
RESEND_API_KEY=your_resend_api_key
PORT=3300
```

### Installation

#### Server

```bash
cd server
npm install
npm run deploy      # Deploy slash commands to Discord
npm run dev         # Start development server
```

#### Client

```bash
cd client
npm install
npm run dev         # Start Next.js dev server
```

### Production Build

```bash
# Server
cd server
npm run build
npm run start

# Client
cd client
npm run build
npm run start
```

## 📧 How Reminders Work

1. **Set Email** - Register your email with `/email`
2. **Create Reminder** - Use `/reminder` with natural language:
   - "Remind me to call mom tomorrow at 5pm"
   - "Daily standup meeting at 9:30am"
   - "Weekly review every Friday at 2pm"
3. **Get Notified** - Receive reminders via Discord DM and email
4. **Auto-Scheduling** - Recurring reminders automatically reschedule

## 🔧 Cron Job

The server exposes a `/api/cron` endpoint that processes due reminders. This can be triggered by:

- External cron services (e.g., Vercel Cron, Railway, etc.)
- A scheduled task on your server

## 📄 License

ISC

## 🔗 Links

- [Add RemindMe to your Discord Server](https://discord.com/oauth2/authorize?client_id=1465395715655209062&scope=bot%20applications.commands&permissions=0)
