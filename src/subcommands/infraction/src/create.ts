import { SlashCommandProps } from "commandkit";
import { EmbedBuilder, GuildMember } from "discord.js";
import { getConfig, instanceOfFDConfig } from "../../../config";
import { MEmployee } from "../../../schemas/employees/employee";
import getCommandFailedToRunEmbed from "../../../utils/getCommandFailedToRunEmbed";
import { MInfraction as MInfraction } from "../../../schemas/infractions/fdInfraction";
import { MFDEmployee } from "../../../schemas/employees/fdEmployee";
import getMessageLoadingEmbed from "../../../utils/getMessageLoadingEmbed";
import { FDInfraction, FDInfractions, StrikeLevel } from "../../../config/infractions/fdInfractions";
import {v4 as uuid} from "uuid";
import getPrettyString from "../../../utils/getPrettyString";
import botConfig from "../../../config/botConfig";
import getCommandSuccessEmbed from "../../../utils/getCommandSuccessEmbed";
import { deleteModel } from "mongoose";

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
  if (!infractionsChannel?.isTextBased()) return;
  
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
    
    if (HCEmployeeFD.rank <= FDEmployee.rank) {
      await interaction.editReply({embeds: [getCommandFailedToRunEmbed("The person is higher/equal to you!")]});
      return;
    }

    await interaction.editReply({embeds: [getMessageLoadingEmbed("Infracting the employee...")]});
 
    const plainInfraction = infractionInput.slice(infractionInput.indexOf("_") + 1);

    if (!Object.keys(FDInfractions).includes(plainInfraction)) {
      await interaction.editReply({embeds: [getCommandFailedToRunEmbed("Invalid infraction type")]});
      return;
    }
  
    const infraction = FDInfractions[plainInfraction as keyof typeof FDInfractions];

    const pastInfractions = (await MInfraction.find({employeeID: mainEmployeeDocument.ID})).filter(d => d.infraction.infraction === infraction);
    
    let strikeLevel: StrikeLevel | undefined;

    if (infraction === FDInfractions.strike) {
      if (pastInfractions.length >= 3) {
        await interaction.editReply({embeds: [getCommandFailedToRunEmbed("This employee has already reached 3 Strikes!")]});
        return;
      }
      strikeLevel = pastInfractions.length + 1;
    }

    const infractionID = uuid();
      
    const infractionObject: FDInfraction = {
      infraction,
      strikeLevel
    }

    await MInfraction.create({
      ID: infractionID,
      infraction: infractionObject,
      date: new Date(),
      employeeID: mainEmployeeDocument.ID,
      highCommandID: HCEmployeeDocument.ID,
      guildID: interaction.guild.id,
      reason: reason,
      notes: notes,
      isAppealable: isAppealable
    });
    
    await interaction.editReply({embeds: [getMessageLoadingEmbed("Success! Sending messages...")]});
      
    const mainEmbed = new EmbedBuilder()
      .setTitle("Infraction.")
      .setDescription(
        `**Employee:** <@!${employee.user.id}> (${employee.user.username})\n` +
        `**Reason:** ${reason}\n` +
        `**Notes:** ${notes ? notes : "N/A"}\n` + 
        `**Infraction:** ${getPrettyString(FDInfractions[infraction])}${strikeLevel ? (" " + strikeLevel.toString()) : ""}\n` +
        `**Appealable:** ${isAppealable ? "Yes " + botConfig.emojis.greenDot : "No " + botConfig.emojis.redDot}`
      )
      .setFooter({text: infractionID})
      .setColor(config.colors.mainEmbedColor);
    
    const DMEmbed = new EmbedBuilder()
      .setTitle("Infraction.")
      .setDescription(
        `You have been infracted in ${config.texts.deptName}!\n` +
        `**Reason:** ${reason}\n` +
        `**Notes:** ${notes ? notes : "N/A"}\n` + 
        `**Infraction:** ${getPrettyString(FDInfractions[infraction])}${strikeLevel ? (" " + strikeLevel.toString()) : ""}\n` +
        `**Appealable:** ${isAppealable ? "Yes " + botConfig.emojis.greenDot : "No " + botConfig.emojis.redDot}\n`
      )
      .setColor(config.colors.mainEmbedColor)
      .setFooter({text: `Infraction ID: ${infractionID}`});
    
    await infractionsChannel.send({embeds: [mainEmbed], content: `<@!${employee.user.id}>`});
    await employee.user.send({embeds: [DMEmbed]}).catch(() => {});
    
    await interaction.editReply({embeds: [getCommandSuccessEmbed()]});
  }
}
