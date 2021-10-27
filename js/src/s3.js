const AWS = require("aws-sdk")

const getObjectFromS3 = async (bucket, key) => {
  const s3 = new AWS.S3()
  const params = {
    Bucket: bucket,
    Key: key
  }
  // Make sure that your calling context has the correct s3:GetObject IAM permission
  return s3.getObject(params).promise()
}

const putObjectToS3 = async (bucket, key, data) => {
  const s3 = new AWS.S3()
  const params = {
    Bucket: bucket,
    Key: key,
    Body: data
  }
  // Make sure that your calling context has the correct s3:PutObject IAM permission
  return s3.putObject(params).promise()
}

module.exports = {
  getObjectFromS3,
  putObjectToS3
}