# RemindMe Bot 🔔

A smart Discord bot that helps you set and manage reminders effortlessly. Just describe your reminder in natural language, and RemindMe handles the rest — powered by AI to understand your intent without complex commands.

## ✨ Features

- **🤖 Natural Language Processing** - Uses AI (Groq with GPT-OSS-120B) to parse your reminder requests naturally
- **⏰ Multiple Reminder Types** - Support for one-time, daily, and weekly recurring reminders
- **📬 Multi-Channel Notifications** - Get reminded via both Discord DM and email
- **📅 Google Calendar Integration** - Automatically sync reminders to your Google Calendar
- **👤 User Profiles** - Manage your email, timezone, and view reminder statistics
- **💌 Beautiful Email Templates** - Professionally designed reminder emails via Resend
- **🌍 Timezone Support** - All reminders respect your configured timezone

## 🛠️ Tech Stack

### Server (Discord Bot)

- **Runtime**: Node.js with TypeScript
- **Discord**: discord.js v14
- **Database**: MongoDB with Mongoose
- **AI**: Groq API (OpenAI-compatible) - GPT-OSS-120B model
- **Email**: Resend
- **Web Server**: Express.js
- **Calendar**: Google Calendar API (googleapis)
- **Date Parsing**: chrono-node

### Client (Landing Page)

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI, Lucide Icons
- **Language**: TypeScript

## 📁 Project Structure

```
remindme/
├── client/                 # Next.js landing page
│   ├── app/               # App router pages
│   │   ├── page.tsx       # Home page
│   │   ├── layout.tsx     # Root layout
│   │   ├── privacy/       # Privacy policy
│   │   └── tos/           # Terms of service
│   ├── component/         # Custom components
│   │   ├── HeroSection.tsx
│   │   ├── Navbar.tsx
│   │   └── LandingButton.tsx
│   └── components/ui/     # shadcn/ui components
│
└── server/                # Discord bot backend
    └── src/
        ├── commands/      # Slash command handlers
        │   ├── email.ts
        │   ├── change-email.ts
        │   ├── reminder-ai.ts
        │   ├── reminder-manual.ts
        │   ├── delete-reminder.ts
        │   ├── listReminder.ts
        │   ├── profile.ts
        │   ├── google-clander.ts
        │   └── help.ts
        ├── models/        # Mongoose schemas
        │   ├── user.models.ts
        │   └── reminder.model.ts
        └── utils/         # Utilities
            ├── cron.jobs.ts
            ├── email.resend.ts
            ├── connectDb.ts
            ├── calenderLink.ts
            └── clearCommand.ts
```

## 🤖 Bot Commands

| Command            | Description                                               |
| ------------------ | --------------------------------------------------------- |
| `/email`           | Set your email address for receiving reminders            |
| `/change-email`    | Update your email address                                 |
| `/reminder-ai`     | Create a new reminder using natural language (AI-powered) |
| `/reminder-manual` | Create a reminder with manual date/time input             |
| `/delete-reminder` | Delete an existing reminder by title                      |
| `/list-reminder`   | View all your active reminders                            |
| `/profile`         | View your profile, stats, and recent reminders            |
| `/google-clander`  | Link your Google Calendar to sync reminders               |
| `/help`            | Show all available commands                               |

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **MongoDB** instance (local or cloud)
- **Discord Bot Token** - [Create a bot](https://discord.com/developers/applications)
- **Groq API Key** - [Get API key](https://console.groq.com/)
- **Resend API Key** - [Get API key](https://resend.com/)
- **Google Cloud Project** (Optional, for Calendar integration)
  - OAuth 2.0 Client ID
  - OAuth 2.0 Client Secret

### Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Discord Configuration
DISCORD_BOT_TOKEN=your_discord_bot_token
clientId=your_discord_client_id
guildId=your_discord_guild_id

# Database
MONGODB_URI=your_mongodb_connection_string

# AI Service
GROQ_API_KEY=your_groq_api_key

# Email Service
RESEND_API_KEY=your_resend_api_key

# Google Calendar (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=https://your-domain.com/api/google-calender/callback

# Server Configuration
PORT=3300
```

### Installation

#### Server Setup

```bash
cd server
npm install
npm run deploy      # Deploy slash commands to Discord
npm run dev         # Start development server
```

**Available Scripts:**

- `npm run dev` - Start development server with ts-node
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Run production build
- `npm run deploy` - Deploy commands to Discord (development)
- `npm run deploy:prod` - Build and deploy commands (production)
- `npm run clearCommands` - Clear all registered slash commands

#### Client Setup

```bash
cd client
npm install
npm run dev         # Start Next.js dev server at http://localhost:3000
```

**Available Scripts:**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

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

### 1. **Initial Setup**

- Use `/email` to register your email address
- Optionally link Google Calendar with `/google-clander`

### 2. **Create Reminders**

**AI-Powered (Recommended):**

```
/reminder-ai details: Remind me to call mom tomorrow at 5pm
/reminder-ai details: Daily standup meeting at 9:30am
/reminder-ai details: Weekly review every Friday at 2pm
```

**Manual Entry:**

```
/reminder-manual title: Team Meeting
                 date: 2026-02-01
                 time: 14:30
                 repeat: weekly
```

### 3. **Receive Notifications**

- **Discord DM**: Embedded message with reminder details
- **Email**: Beautifully formatted HTML email
- **Google Calendar**: Event automatically created (if linked)

### 4. **Auto-Scheduling**

- One-time reminders are deleted after being sent
- Daily reminders reschedule for the next day
- Weekly reminders reschedule for the next week

## 🔧 API Endpoints

The server exposes the following HTTP endpoints:

| Endpoint                        | Method | Description                  |
| ------------------------------- | ------ | ---------------------------- |
| `/`                             | GET    | Health check endpoint        |
| `/api/cron`                     | GET    | Trigger reminder processing  |
| `/api/google-calender`          | GET    | Initiate Google OAuth flow   |
| `/api/google-calender/callback` | GET    | Handle Google OAuth callback |

### Cron Job Setup

The `/api/cron` endpoint processes due reminders. Set up an external cron service to call this endpoint every minute:

**Using cron-job.org:**

```
URL: https://your-domain.com/api/cron
Interval: Every 1 minute
```

**Using Vercel Cron:**

```json
{
  "crons": [
    {
      "path": "/api/cron",
      "schedule": "* * * * *"
    }
  ]
}
```

## 📊 Database Schema

### User Model

```typescript
{
  discordId: string;              // Discord user ID (unique)
  email: string;                  // Email for reminders
  timezone: string;               // User timezone (default: "UTC")
  remindersEnabled: boolean;      // Toggle reminders on/off
  calendarRefreshToken?: string;  // Google OAuth refresh token
  calendarEventsEnabled?: boolean;// Google Calendar sync enabled
  createdAt: Date;
  updatedAt: Date;
}
```

### Reminder Model

```typescript
{
  discordId: string;              // Discord user ID
  email: string;                  // Recipient email
  title: string;                  // Reminder title
  remindAt: Date;                 // UTC timestamp
  repeat: "none" | "daily" | "weekly";
  reminderSent: boolean;          // Processing flag
  archived: boolean;              // Archive flag
  calendarEventId?: string;       // Google Calendar event ID
  createdAt: Date;
  updatedAt: Date;
}
```

## 🎨 Email Template

Reminders are sent with a minimalist, professional email design featuring:

- System monospace font for technical aesthetic
- Clean typography with Inter font
- Responsive layout (max-width: 480px)
- Dark text on white background
- Metadata section with scheduled time and recurrence info

## 🔐 Security Notes

⚠️ **Important**: The `.env` file in this repository contains sensitive credentials and should **NEVER** be committed to version control in production. Make sure to:

1. Add `.env` to `.gitignore` (already configured)
2. Use environment variables in your deployment platform
3. Rotate all API keys and tokens before deploying
4. Consider encrypting the `calendarRefreshToken` in the database

## 🚀 Deployment

### Server Deployment (Railway/Render/Heroku)

1. Push your code to GitHub
2. Connect your repository to your hosting platform
3. Set environment variables in the platform dashboard
4. Deploy the `server` directory
5. Set up external cron service to hit `/api/cron` endpoint

### Client Deployment (Vercel/Netlify)

1. Push your code to GitHub
2. Connect your repository to Vercel/Netlify
3. Set root directory to `client`
4. Deploy with default Next.js settings

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC

## 🔗 Links

- **[Add RemindMe to Discord](https://discord.com/oauth2/authorize?client_id=1465395715655209062&scope=bot%20applications.commands&permissions=0)**
- **[Landing Page](https://remindme.armandev.space)** (if deployed)
- **[Backend API](https://remind-backend.armandev.space)** (if deployed)

## 📝 Changelog

### Current Version

- ✅ AI-powered natural language reminder parsing
- ✅ Google Calendar integration
- ✅ Email notifications with beautiful templates
- ✅ Discord DM notifications
- ✅ Recurring reminders (daily/weekly)
- ✅ User profiles with statistics
- ✅ Timezone support
- ✅ Next.js landing page

### Planned Features

- [ ] Reminder editing
- [ ] Custom repeat intervals
- [ ] Reminder categories/tags
- [ ] Web dashboard for managing reminders
- [ ] SMS notifications
- [ ] Reminder templates
- [ ] Shared reminders for teams

---

**Made with ❤️ by the RemindMe Team**
