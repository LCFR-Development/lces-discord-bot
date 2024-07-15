

;await (async()=>{
  'use strict';
// --- CommandKit require() polyfill ---
  if (typeof require === "undefined") {
    const { createRequire } = await import("node:module");
    const __require = createRequire(import.meta.url);
    Object.defineProperty(globalThis, "require", {
      value: (id) => {
        return __require(id);
      },
      configurable: true,
      enumerable: false,
      writable: true,
    });
  }
// --- CommandKit require() polyfill ---
// --- CommandKit Anti-Crash Monitor ---
  // 'uncaughtException' event is supposed to be used to perform synchronous cleanup before shutting down the process
  // instead of using it as a means to resume operation.
  // But it exists here due to compatibility reasons with discord bot ecosystem.
  const p = (t) => `\x1b[33m${t}\x1b[0m`, b = '[CommandKit Anti-Crash Monitor]', l = console.log, e1 = 'uncaughtException', e2 = 'unhandledRejection';
  if (!process.eventNames().includes(e1)) // skip if it is already handled
    process.on(e1, (e) => {
      l(p(`${b} Uncaught Exception`)); l(p(b), p(e.stack || e));
    })
  if (!process.eventNames().includes(e2)) // skip if it is already handled
    process.on(e2, (r) => {
      l(p(`${b} Unhandled promise rejection`)); l(p(`${b} ${r.stack || r}`));
    });
// --- CommandKit Anti-Crash Monitor ---

})();



/* Optimized production build generated by CommandKit */

// src/index.ts
import "dotenv/config";
import { Client, IntentsBitField } from "discord.js";
import { CommandKit } from "commandkit";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "path";
import mongoose from "mongoose";
var __dirname = dirname(fileURLToPath(import.meta.url));
var client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ]
});
new CommandKit({
  client,
  commandsPath: path.join(__dirname, "commands"),
  eventsPath: path.join(__dirname, "events"),
  validationsPath: path.join(__dirname, "validations"),
  devGuildIds: ["1261627826822447176"],
  devUserIds: ["733939367499792446", "806927626332930058", "705701074975195178"],
  devRoleIds: [],
  skipBuiltInValidations: true,
  bulkRegister: true
});
(async () => {
  try {
    if (await mongoose.connect(process.env.DB_LOGIN)) {
      console.log("\u2705 Connected to DB");
    } else {
      console.log("\u274C Couldn't connect to DB");
    }
    await client.login(process.env.TOKEN);
  } catch (e) {
    console.log("\u274C There was an error while connecting to the database and/or logging in.");
    console.log(e);
  }
})();
