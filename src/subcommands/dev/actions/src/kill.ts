import { SlashCommandProps } from "commandkit";

export default async function({ interaction }: SlashCommandProps) {
   interaction.reply("Killing the bot...");
   await interaction.client.destroy();
   process.exit(0)
}