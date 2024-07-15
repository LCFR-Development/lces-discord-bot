import { SlashCommandProps } from "commandkit";

import * as ms from '@lukeed/ms';

export default async function({ interaction }: SlashCommandProps) {
   const uptime = interaction.client.uptime;
   await interaction.reply(`Uptime: ${ms.format(uptime, true)} (${uptime}ms)`);
}