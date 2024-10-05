import { SlashCommandProps } from "commandkit";
import { SlashCommandBuilder,GuildMember, EmbedBuilder, Colors} from "discord.js";
import { MEmployee } from "../../schemas/employees/employee";
import { getConfig} from "../../config";
import getCommandFailedToRunEmbed from "../../utils/getCommandFailedToRunEmbed";
import erlc from "erlc-api"
import axios from "axios";
import { RobloxUserFromID } from "../../types/RobloxUserFromID";

const client = new erlc.Client({globalToken: "", });
client.config();

const mainEmbed = new EmbedBuilder();

interface infoType {
    playerInfo: FixedServerPlayer;
    vehicles: fixedVehiclesLogs;
}
interface FixedServerPlayer extends Partial<erlc.ServerPlayer>{
    Callsign: string | undefined;
    Team: string;
}
interface fixedVehiclesLogs extends Partial<erlc.VehiclesLog>{
    Name: string | undefined;
}

    const useApi = async (robloxName:string): Promise<false | infoType> => {
        const apiKey = process.env.SERVER_API_KEY as string;
        const players = await erlc.getPlayers(apiKey);
        const vehicles = await erlc.getVehicles(apiKey);
        const foundPlayer = players.find(players => players.Player.startsWith(robloxName));
        const foundVehicles = vehicles.find(vehicles => vehicles.Owner === robloxName)
        if (foundPlayer) {
            foundPlayer.Callsign = foundPlayer.Callsign || 'N/A'; // Default to 'N/A' if Callsign is undefined
            foundPlayer.Team = foundPlayer.Team || 'Unknown';     // Default to 'Unknown' if Team is undefined
        } else {return false}
        const info: infoType = {
            playerInfo: foundPlayer,
            vehicles: foundVehicles || { Name: 'none' }
        }
        return info
    };


export const data = new SlashCommandBuilder()
    .setName("check-duty")
    .setDescription("Check an employee's in-game info")
    .addUserOption(o => o
        .setName("employee")
        .setDescription("The employee to search in-game")
        .setRequired(true)
    )

export async function run({interaction, client}: SlashCommandProps) {
    await interaction.deferReply({ephemeral: true});
    const config = getConfig(interaction);
    const employee = interaction.options.getMember("employee") as GuildMember;

    if (!config) return;
    try {
        const mainEmployee = await MEmployee.findOne({discordID: employee.user.id});
        if (!mainEmployee) {
            await interaction.editReply({embeds: [getCommandFailedToRunEmbed("Employee not found in the database.")]})
            return;
        }
        const robloxID = mainEmployee.robloxID
        const robloxMemberApiResponce = await axios.get<RobloxUserFromID>(`https://users.roblox.com/v1/users/${robloxID}`);
        const robloxMember: RobloxUserFromID = robloxMemberApiResponce.data;
        const robloxName = robloxMember.name
        const info = await useApi(robloxName)

        mainEmbed.setTitle(`${robloxMember.name} in-game information`);

        if(info == false){
            mainEmbed.setColor(Colors.Red);
            mainEmbed.setDescription(
                '❌ Employee is not in-game'
            )
        }else{
            let vehicle = info.vehicles ? info.vehicles.Name : 'none';
            if (!vehicle) { 
                vehicle = 'none'; 
            }
            mainEmbed.setColor(config.colors.mainEmbedColor);
            mainEmbed.setDescription(
                `**Team:** ${info.playerInfo.Team}\n`+
                `**Callsign:** ${info.playerInfo.Callsign}\n`+
                `**Vehicles:** ${info.vehicles.Name}\n`
            )
            
        }
    } catch (error) {
        await interaction.editReply({embeds: [getCommandFailedToRunEmbed(`There was an error while executing this command.`)]});
        console.log(error)
        return;
    }
    await interaction.editReply({embeds: [mainEmbed]});
}