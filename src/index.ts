import 'dotenv/config';

import { Client, IntentsBitField } from 'discord.js';
import { CommandKit } from 'commandkit';

import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import path from 'path';
import mongoose from 'mongoose';

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
   validationsPath: path.join(__dirname, "validations"),
   devGuildIds: ['1261627826822447176'],
   devUserIds: ['733939367499792446', '806927626332930058','705701074975195178'],
   devRoleIds: [],
   skipBuiltInValidations: true,
   bulkRegister: true
});


(async () => {
   try{
      if (await mongoose.connect(process.env.DB_LOGIN as string)) {
         console.log("✅ Connected to DB");
      } else {
         console.log("❌ Couldn't connect to DB");
      }
      
      await client.login(process.env.TOKEN);
   } catch (e) {
      console.log("❌ There was an error while connecting to the database and/or logging in.");
      console.log(e);
   }
})();
