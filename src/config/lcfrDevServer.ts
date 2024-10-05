import { IConfig, IFDConfig } from ".";

const config: IFDConfig = {
   guildID: "1261627826822447176",
   type: "fd",
   channels: {
      activityTest: "1262154276692689028",
      shift: "1266302472809615360",
      appResults: "1270684375427715135",
      promotions: "1274778238287216650",
      demotions: "1274795698159616132"
   },
   texts: {
      deptName: "LCDS",
      ACMainMsg: "The LCFR High Command team has decided to host an activity check. Please press the button below to let the HC team know you are active. Not reacting will result in punishment.",
   },
   roles: {
      reactedToActivityTest: "1262170352038182992",
      loaRole: "1262378282146332713",
      employeeRole: "1262425657518854236",
      appReader: "1270714251715280896"
   },
   colors: {
      mainEmbedColor: "DarkRed",
   },
   images: {
      shiftImage: "https://cdn.discordapp.com/attachments/1182324323109834773/1182782882377383946/New_Project_9.png?ex=66a55a66&is=66a408e6&hm=6169446a7076e774d8e4f2816d9d2f03444db8997aedc766995d4aafc0cb7a5d&",
   },
   ranks: {
      probationary_firefighter: "1270701311435735110",
      firefighter: "temp",
      senior_firefighter: "temp",
      advanced_firefighter: "temp",
      engineer: "temp",
      lieutenant: "temp",
      captain: "temp",
      battalion_chief: "temp",
      district_chief: "temp",
      assistant_fire_chief: "temp",
      fire_chief: "temp",
      assistant_commissioner: "temp",
      deputy_commissioner: "temp",
      commissioner: "temp"
   },
   rankCategories: {
      trainee_rank: "1270701271346712629",
      low_ranks: "temp",
      high_ranks: "temp",
      low_command: "1275148502451753013",
      high_command: "1262127012538093609",
      commissioner_office: "1266302696856621129"
   }
};

export default config;
