const AWS = require("aws-sdk")

const fetchSecrets = async (regionName, secretName, errorHandler = null) => {
  const secretsClient = new AWS.SecretsManager({
      region: regionName
  })
  try {
    // Make sure that your calling context has the correct secretsmanager:GetSecretValue IAM permission
    const data = await secretsClient.getSecretValue({ SecretId: secretName }).promise()
    const secretValue = "SecretString" in data ? data.SecretString : Buffer.from(data.SecretBinary, "base64").toString("ascii")
    return JSON.parse(secretValue)
  } catch (err) {
    if (errorHandler) {
      errorHandler(err)
    } else {
      console.log(err)
      switch(err.code) {
        case "DecryptionFailureException":
          // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
          // Deal with the exception here, and/or rethrow at your discretion.
          throw err
        case "InternalServiceErrorException":
          // An error occurred on the server side.
          // Deal with the exception here, and/or rethrow at your discretion.
          throw err
        case "InvalidParameterException":
          // You provided an invalid value for a parameter.
          // Deal with the exception here, and/or rethrow at your discretion.
          throw err
        case "InvalidRequestException":
          // You provided a parameter value that is not valid for the current state of the resource.
          // Deal with the exception here, and/or rethrow at your discretion.
          throw err
        case "ResourceNotFoundException":
          // We can't find the resource that you asked for.
          // Deal with the exception here, and/or rethrow at your discretion.
          throw err
        case "AccessDeniedException":
          // The calling context lacks the requiste IAM permission
          // Deal with the exception here, and/or rethrow at your discretion.
          throw err
        default:
          // Something else
          throw err
      }
    }
  }
}

module.exports = {
  fetchSecrets
}
