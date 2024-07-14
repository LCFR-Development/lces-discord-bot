

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


})();



// src/index.js
import "dotenv/config";
import { Client, IntentsBitField } from "discord.js";
import { CommandKit } from "commandkit";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "path";
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
  devGuildIds: ["1261627826822447176"],
  devUserIds: ["733939367499792446", "806927626332930058", "705701074975195178"],
  devRoleIds: [],
  skipBuiltInValidations: true,
  bulkRegister: true
});
client.login(process.env.TOKEN);
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgJ2RvdGVudi9jb25maWcnO1xuXG5pbXBvcnQgeyBDbGllbnQsIEludGVudHNCaXRGaWVsZCB9IGZyb20gJ2Rpc2NvcmQuanMnO1xuaW1wb3J0IHsgQ29tbWFuZEtpdCB9IGZyb20gJ2NvbW1hbmRraXQnO1xuXG5pbXBvcnQgeyBqb2luLCBkaXJuYW1lIH0gZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICdub2RlOnVybCc7XG5cbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5jb25zdCBfX2Rpcm5hbWUgPSBkaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSk7XG5cbmNvbnN0IGNsaWVudCA9IG5ldyBDbGllbnQoe1xuICBpbnRlbnRzOiBbXG4gICAgSW50ZW50c0JpdEZpZWxkLkZsYWdzLkd1aWxkcyxcbiAgICBJbnRlbnRzQml0RmllbGQuRmxhZ3MuR3VpbGRNZW1iZXJzLFxuICAgIEludGVudHNCaXRGaWVsZC5GbGFncy5HdWlsZE1lc3NhZ2VzLFxuICAgIEludGVudHNCaXRGaWVsZC5GbGFncy5NZXNzYWdlQ29udGVudCxcbiAgXSxcbn0pO1xuXG5uZXcgQ29tbWFuZEtpdCh7XG4gIGNsaWVudCxcbiAgY29tbWFuZHNQYXRoOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnY29tbWFuZHMnKSxcbiAgZXZlbnRzUGF0aDogcGF0aC5qb2luKF9fZGlybmFtZSwgJ2V2ZW50cycpLFxuICBkZXZHdWlsZElkczogWycxMjYxNjI3ODI2ODIyNDQ3MTc2J10sXG4gIGRldlVzZXJJZHM6IFsnNzMzOTM5MzY3NDk5NzkyNDQ2JywgJzgwNjkyNzYyNjMzMjkzMDA1OCcsJzcwNTcwMTA3NDk3NTE5NTE3OCddLFxuICBkZXZSb2xlSWRzOiBbXSxcbiAgc2tpcEJ1aWx0SW5WYWxpZGF0aW9uczogdHJ1ZSxcbiAgYnVsa1JlZ2lzdGVyOiB0cnVlLFxufSk7XG5cblxuY2xpZW50LmxvZ2luKHByb2Nlc3MuZW52LlRPS0VOKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxPQUFPO0FBRVAsU0FBUyxRQUFRLHVCQUF1QjtBQUN4QyxTQUFTLGtCQUFrQjtBQUUzQixTQUFTLE1BQU0sZUFBZTtBQUM5QixTQUFTLHFCQUFxQjtBQUU5QixPQUFPLFVBQVU7QUFFakIsSUFBTSxZQUFZLFFBQVEsY0FBYyxZQUFZLEdBQUcsQ0FBQztBQUV4RCxJQUFNLFNBQVMsSUFBSSxPQUFPO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ1AsZ0JBQWdCLE1BQU07QUFBQSxJQUN0QixnQkFBZ0IsTUFBTTtBQUFBLElBQ3RCLGdCQUFnQixNQUFNO0FBQUEsSUFDdEIsZ0JBQWdCLE1BQU07QUFBQSxFQUN4QjtBQUNGLENBQUM7QUFFRCxJQUFJLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxjQUFjLEtBQUssS0FBSyxXQUFXLFVBQVU7QUFBQSxFQUM3QyxZQUFZLEtBQUssS0FBSyxXQUFXLFFBQVE7QUFBQSxFQUN6QyxhQUFhLENBQUMscUJBQXFCO0FBQUEsRUFDbkMsWUFBWSxDQUFDLHNCQUFzQixzQkFBcUIsb0JBQW9CO0FBQUEsRUFDNUUsWUFBWSxDQUFDO0FBQUEsRUFDYix3QkFBd0I7QUFBQSxFQUN4QixjQUFjO0FBQ2hCLENBQUM7QUFHRCxPQUFPLE1BQU0sUUFBUSxJQUFJLEtBQUs7IiwKICAibmFtZXMiOiBbXQp9Cg==