import Char from "../src/dynamodb/char";
import _ from "lodash";
import RaiderIO from "../src/raiderio";
import CharHistory from "../src/dynamodb/charHistory";

export const handle = async (event, context, callback) => {
   const message = JSON.parse(event.Records[0].body);

   try {
      const dbChar = await Char.getItem(message.realm, message.name, true);

      if (!_.isEmpty(dbChar)) {
         const char = dbChar.Item;
         const pieces = message.realm.split("_");
         const charRaiderIo = await RaiderIO.getCharacter(char.name, pieces[0], pieces[1]);
         const score = Math.round(charRaiderIo.info.characterDetails.mythicPlusScores.all.score);
         const now = new Date();

         if (!char.score || score > char.score) {
            try {
               await Char.updateScore(char.realm, char.name, score, now.getTime());
               await CharHistory.putItem(`${char.realm}_${char.name}`, now.getTime(), {
                  score: score
               });
            } catch (e) {
               if (e.code !== "ConditionalCheckFailedException") {
                  callback(e);
                  return;
               }
            }
         }
      }
   } catch (e) {
      callback(e);
      return;
   }

   callback();
};
