import { SlashCommandProps } from "commandkit";
import { GuildMember } from "discord.js";
import { getConfig, instanceOfFDConfig } from "../../../config";
import { MEmployee } from "../../../schemas/employees/employee";
import getCommandFailedToRunEmbed from "../../../utils/getCommandFailedToRunEmbed";
import { MInfraction as MInfraction } from "../../../schemas/infractions/fdInfraction";
import { MFDEmployee } from "../../../schemas/employees/fdEmployee";
import getMessageLoadingEmbed from "../../../utils/getMessageLoadingEmbed";

export default async function({interaction}: SlashCommandProps) {
  const config = getConfig(interaction);
  if (!config) return;
  if (!interaction.inCachedGuild()) return;

  await interaction.deferReply({ephemeral: true});
  await interaction.editReply({embeds: [getMessageLoadingEmbed("Getting employee info")]}); 

  const employee = interaction.options.getMember("employee") as GuildMember; 
  const reason = interaction.options.getString("reason") as string; 
  const infractionInput = interaction.options.getString("infraction") as string;
  const isAppealable = interaction.options.getBoolean("appealable") as boolean;
  const notes = interaction.options.getString("notes");

  const mainEmployeeDocument = await MEmployee.findOne({discordID: employee.user.id});
  if (!mainEmployeeDocument) {
    await interaction.editReply({embeds: [getCommandFailedToRunEmbed("Employee not found!")]});
    return;
  }

  const HCEmployeeDocument = await MEmployee.findOne({discordID: interaction.user.id});
  if (!HCEmployeeDocument) {
    await interaction.editReply({embeds: [getCommandFailedToRunEmbed("You are not an employee!")]});
    return;
  }

  const infractionsChannel = await interaction.guild.channels.fetch(config.channels.infractions);
  if (!infractionsChannel) return;
  
  if (infractionInput.startsWith("fd")) {
    if (!instanceOfFDConfig(config)) {
      await interaction.editReply({embeds: [getCommandFailedToRunEmbed("Wrong infraction type for this server!")]});
      return;
    }
    
    const FDEmployee = await MFDEmployee.findOne({ID: mainEmployeeDocument.ID});
    const HCEmployeeFD = await MFDEmployee.findOne({ID: HCEmployeeDocument.ID});
    if (!FDEmployee) {
      await interaction.editReply({embeds: [getCommandFailedToRunEmbed("The employee is not in FD!")]});
      return;
    }
    if (!HCEmployeeFD) {
      await interaction.editReply({embeds: [getCommandFailedToRunEmbed("You are not an FD employee!")]});
      return;
    }
      
    const pastInfractions = await MInfraction.find({employeeID: mainEmployeeDocument.ID});
  }
}
