import Char from "../src/dynamodb/char";
import SQS from "../src/sqs/sqs";

const queue = process.env.SQS_CHAR_RAIDER_IO_QUEUE;

export const handle = async (event, context, callback) => {
   try {
      let scanResult;
      let params = {};
      do {
         scanResult = await Char.scan(params);

         const chars = scanResult.Items;

         for (let i = 0; i < chars.length; i++) {
            const {realm, name} = chars[i];
            await SQS.sendMessage(queue, {realm, name});
         }

         params.ExclusiveStartKey = scanResult.LastEvaluatedKey;
      } while (scanResult.LastEvaluatedKey !== undefined);
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
