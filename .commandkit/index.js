

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



// src/index.ts
import "dotenv/config";
import { Client, IntentsBitField } from "discord.js";
import { CommandKit } from "commandkit";
import { dirname } from "node:path";
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
  validationsPath: path.join(__dirname, "validations"),
  devGuildIds: ["1261627826822447176"],
  devUserIds: ["733939367499792446", "806927626332930058", "705701074975195178"],
  devRoleIds: [],
  skipBuiltInValidations: true,
  bulkRegister: true
});
client.login(process.env.TOKEN);
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgJ2RvdGVudi9jb25maWcnO1xyXG5cclxuaW1wb3J0IHsgQ2xpZW50LCBJbnRlbnRzQml0RmllbGQgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuaW1wb3J0IHsgQ29tbWFuZEtpdCB9IGZyb20gJ2NvbW1hbmRraXQnO1xyXG5cclxuaW1wb3J0IHsgam9pbiwgZGlybmFtZSB9IGZyb20gJ25vZGU6cGF0aCc7XHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICdub2RlOnVybCc7XHJcblxyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbmNvbnN0IF9fZGlybmFtZSA9IGRpcm5hbWUoZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpKTtcclxuXHJcbmNvbnN0IGNsaWVudCA9IG5ldyBDbGllbnQoe1xyXG4gICBpbnRlbnRzOiBbXHJcbiAgICAgIEludGVudHNCaXRGaWVsZC5GbGFncy5HdWlsZHMsXHJcbiAgICAgIEludGVudHNCaXRGaWVsZC5GbGFncy5HdWlsZE1lbWJlcnMsXHJcbiAgICAgIEludGVudHNCaXRGaWVsZC5GbGFncy5HdWlsZE1lc3NhZ2VzLFxyXG4gICAgICBJbnRlbnRzQml0RmllbGQuRmxhZ3MuTWVzc2FnZUNvbnRlbnQsXHJcbiAgIF0sXHJcbn0pO1xyXG5cclxubmV3IENvbW1hbmRLaXQoe1xyXG4gICBjbGllbnQsXHJcbiAgIGNvbW1hbmRzUGF0aDogcGF0aC5qb2luKF9fZGlybmFtZSwgJ2NvbW1hbmRzJyksXHJcbiAgIGV2ZW50c1BhdGg6IHBhdGguam9pbihfX2Rpcm5hbWUsICdldmVudHMnKSxcclxuICAgdmFsaWRhdGlvbnNQYXRoOiBwYXRoLmpvaW4oX19kaXJuYW1lLCBcInZhbGlkYXRpb25zXCIpLFxyXG4gICBkZXZHdWlsZElkczogWycxMjYxNjI3ODI2ODIyNDQ3MTc2J10sXHJcbiAgIGRldlVzZXJJZHM6IFsnNzMzOTM5MzY3NDk5NzkyNDQ2JywgJzgwNjkyNzYyNjMzMjkzMDA1OCcsJzcwNTcwMTA3NDk3NTE5NTE3OCddLFxyXG4gICBkZXZSb2xlSWRzOiBbXSxcclxuICAgc2tpcEJ1aWx0SW5WYWxpZGF0aW9uczogdHJ1ZSxcclxuICAgYnVsa1JlZ2lzdGVyOiB0cnVlXHJcbn0pO1xyXG5cclxuXHJcbmNsaWVudC5sb2dpbihwcm9jZXNzLmVudi5UT0tFTik7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxPQUFPO0FBRVAsU0FBUyxRQUFRLHVCQUF1QjtBQUN4QyxTQUFTLGtCQUFrQjtBQUUzQixTQUFlLGVBQWU7QUFDOUIsU0FBUyxxQkFBcUI7QUFFOUIsT0FBTyxVQUFVO0FBRWpCLElBQU0sWUFBWSxRQUFRLGNBQWMsWUFBWSxHQUFHLENBQUM7QUFFeEQsSUFBTSxTQUFTLElBQUksT0FBTztBQUFBLEVBQ3ZCLFNBQVM7QUFBQSxJQUNOLGdCQUFnQixNQUFNO0FBQUEsSUFDdEIsZ0JBQWdCLE1BQU07QUFBQSxJQUN0QixnQkFBZ0IsTUFBTTtBQUFBLElBQ3RCLGdCQUFnQixNQUFNO0FBQUEsRUFDekI7QUFDSCxDQUFDO0FBRUQsSUFBSSxXQUFXO0FBQUEsRUFDWjtBQUFBLEVBQ0EsY0FBYyxLQUFLLEtBQUssV0FBVyxVQUFVO0FBQUEsRUFDN0MsWUFBWSxLQUFLLEtBQUssV0FBVyxRQUFRO0FBQUEsRUFDekMsaUJBQWlCLEtBQUssS0FBSyxXQUFXLGFBQWE7QUFBQSxFQUNuRCxhQUFhLENBQUMscUJBQXFCO0FBQUEsRUFDbkMsWUFBWSxDQUFDLHNCQUFzQixzQkFBcUIsb0JBQW9CO0FBQUEsRUFDNUUsWUFBWSxDQUFDO0FBQUEsRUFDYix3QkFBd0I7QUFBQSxFQUN4QixjQUFjO0FBQ2pCLENBQUM7QUFHRCxPQUFPLE1BQU0sUUFBUSxJQUFJLEtBQUs7IiwKICAibmFtZXMiOiBbXQp9Cg==