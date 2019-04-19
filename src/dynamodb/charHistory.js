import DynamoDB from "./dynamodb";

const tableName = process.env.DYNAMODB_CHAR_HISTORY_TABLE;

class CharHistory {
   static async putItem(charId, timestamp, params) {
      const item = Object.assign({charId, timestamp}, params || {});
      return await DynamoDB.putItem(tableName, item);
   }

   static async queryByCharId(charId) {
      return await DynamoDB.query(tableName, {
         KeyConditionExpression: "charId = :charId",
         ExpressionAttributeValues: {
            ":charId": charId
         }
      });
   }
}

export default CharHistory;
