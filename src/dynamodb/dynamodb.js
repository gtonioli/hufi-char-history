const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

class DynamoDB {
   static getItem(tableName, key) {
      return ddb.get({
         TableName: tableName,
         Key: key
      }).promise();
   }

   static putItem(tableName, item) {
      return ddb.put({
         TableName: tableName,
         Item: item
      }).promise();
   }
}

export default DynamoDB;
