import RaiderIO from "../src/raiderio";
import Char from "../src/dynamodb/char";
import _ from "lodash";

export const handle = async (event, context, callback) => {
   try {
      const guildMembers = await RaiderIO.listGuildMembers();
      for (let i = 0; i < guildMembers.length; i++) {
         const member = guildMembers[i];
         const char = member.character;
         const realm = char.region.short_name + "_" + char.realm.name;
         const name = char.name;
         const dbChar = await Char.getItem(realm, name);

         if (_.isEmpty(dbChar)) {
            const now = new Date();
            await Char.putItem(realm, name, {
               createTime: now.getTime()
            });
         }
      }
   } catch (e) {
      if (e instanceof Error) {
         callback(e.message);
      } else {
         callback(e);
      }
      return;
   }

   callback();
};
