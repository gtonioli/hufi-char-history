const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

const region = process.env.AWS_REGION;
const accountId = process.env.AWS_ACCOUNT_ID;

class SQS {
   static sendMessage(queue, message) {
      return sqs.sendMessage({
         QueueUrl: `https://sqs.${region}.amazonaws.com/${accountId}/${queue}`,
         MessageBody: JSON.stringify(message)
      }).promise();
   }
}

export default SQS;
