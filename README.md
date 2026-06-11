# Bot Discord

## Setup

1. Install Node.js 20.11 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Put a new Discord bot token in `DISCORD_TOKEN`.
5. Put your MongoDB connection string in `MONGODB_URI`.
6. Run `npm start`.

In the Discord Developer Portal, enable these privileged gateway intents for the bot:

- Server Members Intent
- Message Content Intent

## Security notes

- Do not commit `.env`, `config.json`, database files, or logs.
- The old Discord token and MongoDB password were committed before. Rotate both before running the bot again.
- If this repository is public, rewrite Git history or create a fresh private repository before pushing more commits.
