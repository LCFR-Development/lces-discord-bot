import { IConfig, IFDConfig } from ".";

const config: IFDConfig = {
   guildID: "1161190779629359114",
   type: "fd",
   texts: {
      ACMainMsg: "The LCFR High Command team has decided to host an activity check. Please press the button below to let the HC team know you are active. Not reacting will result in punishment.",
      deptName: "LCFR",
   },
   images: {
      shiftImage: "https://cdn.discordapp.com/attachments/1182324323109834773/1182782882377383946/New_Project_9.png?ex=66a55a66&is=66a408e6&hm=6169446a7076e774d8e4f2816d9d2f03444db8997aedc766995d4aafc0cb7a5d&",
   },
   channels: {
      activityTest: "1161190781088960621",
      shift: "1180500559095152650",
      appResults: "1161190781336440839",
      promotions: "1161190782397599773",
      demotions: "1180559408896430100"
   },
   roles: {
      reactedToActivityTest: "1185940940175724635",
      loaRole: "1161190780027818068",
      employeeRole: "1161190779943931908",
      appReader: "1181885383668158524"
   },
   emojis: {

   },
   colors: {
      mainEmbedColor: "DarkRed",
   },
   ranks: {
      probationary_firefighter: "1161190779943931910",
      firefighter: "1161190779943931913",
      senior_firefighter: "1161190779960696949",
      advanced_firefighter: "1161190779960696951",
      engineer: "1161190779960696953",
      lieutenant: "1161190779977470006",
      captain: "1161190779977470008",
      senior_captain: "1206331421669724192",
      safety_officer: "1259065232668754012",
      battalion_chief: "1161190779977470010",
      station_officer: "1206993470992949249",
      district_supervisor: "1206993468291809381",
      district_chief: "1206993347005120514",
      assistant_commissioner: "1161190779977470012",
      deputy_commissioner: "1161190780027818066",
      commissioner: "1161190780027818067"
   },
   rankCategories: {
      trainee_rank: "1161190779943931911",
      low_ranks: "1161190779977470004",
      high_ranks: "1161190779977470009",
      low_command: "1161190779977470013",
      high_command: "1206993228608311326",
      commissioner_office: "1206993993112485888"
   }  
}

export default config;