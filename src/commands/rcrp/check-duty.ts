import { SlashCommandProps } from "commandkit";
import { SlashCommandBuilder,GuildMember } from "discord.js";
import { MEmployee } from "../../schemas/employees/employee";
import { getConfig} from "../../config";
import getCommandFailedToRunEmbed from "../../utils/getCommandFailedToRunEmbed";
import erlc from "erlc-api"

function useAPI(robloxID: string){
    const useApi = async () => {
        const apiKey = process.env.server_api_key as string;
        const players = await erlc.getPlayers(apiKey);
        const vehicles = await erlc.getVehicles(apiKey);
        const foundPlayer = players.find(players => players.Player === robloxID);
        if(!foundPlayer){return false}
    };
}

export const data = new SlashCommandBuilder()
    .setName("check-duty")
    .setDescription("Check if an employee is playing as FD")
    .addUserOption(o => o
        .setName("employee")
        .setDescription("The employee to search in-game")
        .setRequired(true)
    )

export async function run({interaction, client}: SlashCommandProps) {
    const config = getConfig(interaction);
    const employee = interaction.options.getMember("employee") as GuildMember;

    if (!config) return;
    try {
        const mainEmployee = await MEmployee.findOne({discordID: employee.user.id});
        if (!mainEmployee) {
          await interaction.editReply({embeds: [getCommandFailedToRunEmbed("Employee not found.")]})
          return;
        }
        const robloxID = mainEmployee.robloxID
    } catch (error) {
        await interaction.editReply({embeds: [getCommandFailedToRunEmbed(`There was an error while executing this command.`)]});
        return;
     }
}