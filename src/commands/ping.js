import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
                .setName('ping')
                .setDescription('Replies with Pong!');
      export async function run({interaction, client, handler}) {
                await interaction.reply('Pong!');
        };
        
        export const options ={};