/* Optimized production build generated by CommandKit */
import {
  __name
} from "../../chunk-4HQ2LG3N.js";

// src/events/ready/ready.ts
var ready_default = /* @__PURE__ */ __name((client) => {
  if (!client.isReady())
    return;
  console.log(`${client.user.tag} is online!`);
}, "default");
export {
  ready_default as default
};
