

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



import {
  __require
} from "./chunk-U2DZE3DI.js";

// src/index.js
import "dotenv/config";
import { Client, IntentsBitField } from "discord.js";
import { CommandKit } from "commandkit";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
var path = __require("path");
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgJ2RvdGVudi9jb25maWcnO1xuXG5pbXBvcnQgeyBDbGllbnQsIEludGVudHNCaXRGaWVsZCB9IGZyb20gJ2Rpc2NvcmQuanMnO1xuaW1wb3J0IHsgQ29tbWFuZEtpdCB9IGZyb20gJ2NvbW1hbmRraXQnO1xuXG5pbXBvcnQgeyBqb2luLCBkaXJuYW1lIH0gZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICdub2RlOnVybCc7XG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbmNvbnN0IF9fZGlybmFtZSA9IGRpcm5hbWUoZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpKTtcblxuY29uc3QgY2xpZW50ID0gbmV3IENsaWVudCh7XG4gIGludGVudHM6IFtcbiAgICBJbnRlbnRzQml0RmllbGQuRmxhZ3MuR3VpbGRzLFxuICAgIEludGVudHNCaXRGaWVsZC5GbGFncy5HdWlsZE1lbWJlcnMsXG4gICAgSW50ZW50c0JpdEZpZWxkLkZsYWdzLkd1aWxkTWVzc2FnZXMsXG4gICAgSW50ZW50c0JpdEZpZWxkLkZsYWdzLk1lc3NhZ2VDb250ZW50LFxuICBdLFxufSk7XG5cbm5ldyBDb21tYW5kS2l0KHtcbiAgY2xpZW50LFxuICBjb21tYW5kc1BhdGg6IHBhdGguam9pbihfX2Rpcm5hbWUsICdjb21tYW5kcycpLFxuICBldmVudHNQYXRoOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnZXZlbnRzJyksXG4gIGRldkd1aWxkSWRzOiBbJzEyNjE2Mjc4MjY4MjI0NDcxNzYnXSxcbiAgZGV2VXNlcklkczogWyc3MzM5MzkzNjc0OTk3OTI0NDYnLCAnODA2OTI3NjI2MzMyOTMwMDU4JywnNzA1NzAxMDc0OTc1MTk1MTc4J10sXG4gIGRldlJvbGVJZHM6IFtdLFxuICBza2lwQnVpbHRJblZhbGlkYXRpb25zOiB0cnVlLFxuICBidWxrUmVnaXN0ZXI6IHRydWUsXG59KTtcblxuXG5jbGllbnQubG9naW4ocHJvY2Vzcy5lbnYuVE9LRU4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7QUFBQSxPQUFPO0FBRVAsU0FBUyxRQUFRLHVCQUF1QjtBQUN4QyxTQUFTLGtCQUFrQjtBQUUzQixTQUFTLE1BQU0sZUFBZTtBQUM5QixTQUFTLHFCQUFxQjtBQUU5QixJQUFNLE9BQU8sVUFBUSxNQUFNO0FBRTNCLElBQU0sWUFBWSxRQUFRLGNBQWMsWUFBWSxHQUFHLENBQUM7QUFFeEQsSUFBTSxTQUFTLElBQUksT0FBTztBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNQLGdCQUFnQixNQUFNO0FBQUEsSUFDdEIsZ0JBQWdCLE1BQU07QUFBQSxJQUN0QixnQkFBZ0IsTUFBTTtBQUFBLElBQ3RCLGdCQUFnQixNQUFNO0FBQUEsRUFDeEI7QUFDRixDQUFDO0FBRUQsSUFBSSxXQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EsY0FBYyxLQUFLLEtBQUssV0FBVyxVQUFVO0FBQUEsRUFDN0MsWUFBWSxLQUFLLEtBQUssV0FBVyxRQUFRO0FBQUEsRUFDekMsYUFBYSxDQUFDLHFCQUFxQjtBQUFBLEVBQ25DLFlBQVksQ0FBQyxzQkFBc0Isc0JBQXFCLG9CQUFvQjtBQUFBLEVBQzVFLFlBQVksQ0FBQztBQUFBLEVBQ2Isd0JBQXdCO0FBQUEsRUFDeEIsY0FBYztBQUNoQixDQUFDO0FBR0QsT0FBTyxNQUFNLFFBQVEsSUFBSSxLQUFLOyIsCiAgIm5hbWVzIjogW10KfQo=