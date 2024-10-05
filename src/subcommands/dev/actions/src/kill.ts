import { SlashCommandProps } from "commandkit";

export default async function({ interaction }: SlashCommandProps) {
   interaction.reply("Killing the bot...");
   console.log(`🔴 Kill action has been ran by ${interaction.user.username}`);
   await interaction.client.destroy();
   process.exit(0)
}