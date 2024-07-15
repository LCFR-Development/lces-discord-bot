import { ButtonKit } from "commandkit";

export default function(button: ButtonKit): ButtonKit {
   const buttonJSON = button.toJSON();

   const disabledButton = new ButtonKit()
      .setCustomId("disabled")
      .setDisabled(true)
      .setStyle(buttonJSON.style);

   if (buttonJSON.emoji) {
      disabledButton.setEmoji(buttonJSON.emoji);
   }
   if (buttonJSON.label) {
      disabledButton.setLabel(buttonJSON.label);
   }
   
   return disabledButton;
}