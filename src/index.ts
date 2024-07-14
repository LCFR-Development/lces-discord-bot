import 'dotenv/config';

import { Client, IntentsBitField } from 'discord.js';
import { CommandKit } from 'commandkit';

import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

new CommandKit({
  client,
  commandsPath: path.join(__dirname, 'commands'),
  eventsPath: path.join(__dirname, 'events'),
  devGuildIds: ['1261627826822447176'],
  devUserIds: ['733939367499792446', '806927626332930058','705701074975195178'],
  devRoleIds: [],
  skipBuiltInValidations: true,
  bulkRegister: true,
});


client.login(process.env.TOKEN);
