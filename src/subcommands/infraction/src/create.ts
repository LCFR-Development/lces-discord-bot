import { SlashCommandProps } from "commandkit";
import { GuildMember } from "discord.js";
import { getConfig } from "../../../config";
import { MEmployee } from "../../../schemas/employees/employee";
import getCommandFailedToRunEmbed from "../../../utils/getCommandFailedToRunEmbed";

export default async function({interaction}: SlashCommandProps) {
  const config = getConfig(interaction);
  if (!config) return;

  await interaction.deferReply({ephemeral: true});
  

  const employee = interaction.options.getMember("employee") as GuildMember; 
  const reason = interaction.options.getString("reason") as string; 
  const infractionInput = interaction.options.getString("infraction") as string;
  const isAppealable = interaction.options.getBoolean("appealable") as boolean;
  const notes = interaction.options.getString("notes");


  const mainEmployeeDocument = MEmployee.findOne({discordID: employee.user.id});
  if (!mainEmployeeDocument) {
    await interaction.editReply({embeds: [getCommandFailedToRunEmbed("Employee not found!")]})
  }
}
