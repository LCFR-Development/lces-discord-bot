/* Optimized production build generated by CommandKit */
import {
  __name
} from "../chunk-4HQ2LG3N.js";

// src/commands/ping.ts
var data = {
  name: "ping",
  description: "Pong!"
};
function run({ interaction, client, handler }) {
  interaction.reply(`:ping_pong: Pong! ${client.ws.ping}ms`);
}
__name(run, "run");
var options = {
  devOnly: true,
  userPermissions: ["Administrator", "AddReactions"],
  botPermissions: ["Administrator", "AddReactions"],
  deleted: false
};
export {
  data,
  options,
  run
};