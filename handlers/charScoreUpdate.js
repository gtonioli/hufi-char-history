import Char from "../src/dynamodb/char";
import _ from "lodash";
import RaiderIO from "../src/raiderio";
import CharHistory from "../src/dynamodb/charHistory";
import S3 from "../src/s3";
import slugify from "slugify";
import Chart from "../src/chart";

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
         const key = `${char.realm}_${char.name}`;

         await Char.updateScore(char.realm, char.name, score, now.getTime());
         await CharHistory.putItem(key, now.getTime(), {
            score: score
         });

         const history = await CharHistory.queryByCharId(key);
         const items = history.Items.sort((x, y) => {
            return y.timestamp - x.timestamp
         });
         const chartX = [];
         const chartY = [];

         items.forEach((item) => {
            const date = new Date(item.timestamp);
            chartX.push(date.toISOString());
            chartY.push(item.score);
         });

         const slug = slugify(key, {
            lower: true
         });
         const s3Key = "charts/evolution/" + slug + ".png";
         const chart = await Chart.getBase64({
            "x": chartX,
            "y": chartY,
            "type": "lines+markers"
         });
         await S3.putImageObject(s3Key, chart, 'image/png');
      }
   } catch (e) {
      callback(e);
      return;
   }

   callback();
};
