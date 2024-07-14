import { Client } from 'discord.js';

export default (client: Client) => {
   if (!client.isReady()) return;
   console.log(`${client.user.tag} is online!`);
};
