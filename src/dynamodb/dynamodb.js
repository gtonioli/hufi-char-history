const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

class DynamoDB {
   static getItem(tableName, key, consistentRead) {
      return ddb.get({
         TableName: tableName,
         Key: key,
         ConsistentRead: !!consistentRead
      }).promise();
   }

   static putItem(tableName, item) {
      return ddb.put({
         TableName: tableName,
         Item: item
      }).promise();
   }

   static update(tableName, key, params) {
      return ddb.update({
         TableName: tableName,
         Key: key,
         ...params
      }).promise();
   }

   static query(tableName, params) {
      return ddb.query({
         TableName: tableName,
         ...params
      }).promise();
   }
}

export default DynamoDB;
