import DynamoDB from "./dynamodb";

const tableName = process.env.DYNAMODB_CHAR_TABLE;

class Char {
   static async getItem(realm, name) {
      return await DynamoDB.getItem(tableName, {realm, name});
   }

   static async putItem(realm, name, params) {
      const item = Object.assign({realm, name}, params || {});
      return await DynamoDB.putItem(tableName, item);
   }

   static async updateScore(realm, name, score, updateTime) {
      return await DynamoDB.update(tableName, {realm, name}, {
         UpdateExpression: "SET score = :score, updateTime = :updateTime",
         ExpressionAttributeValues: {
            ":score": score,
            ":updateTime": updateTime
         },
         ConditionExpression: "attribute_not_exists(score)  OR :score > score"
      });
   }
}

export default Char;
