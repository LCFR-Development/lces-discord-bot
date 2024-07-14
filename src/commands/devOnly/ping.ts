import type { CommandData, SlashCommandProps, CommandOptions } from 'commandkit';
import CustomCommandOptions from '../../types/CustomCommandOptions';

export const data: CommandData = {
   name: 'ping',
   description: 'Pong!',
}

export function run({ interaction, client, handler }: SlashCommandProps) {
   interaction.reply(`:ping_pong: Pong! ${client.ws.ping}ms`);
}

export const options: CustomCommandOptions = {
   devOnly: true,
   deleted: false,
}