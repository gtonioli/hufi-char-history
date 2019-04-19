const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const bucketName = process.env.S3_CHAR_HISTORY_BUCKET;

class S3 {
   static async putImageObject(key, body, contentType) {
      const object = {
         Bucket: bucketName,
         Key: key,
         ACL: "public-read",
         Body: new Buffer(body, "base64"),
         ContentType: contentType
      };

      return await s3.putObject(object).promise();
   }
}

export default S3;
