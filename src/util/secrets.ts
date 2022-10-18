import * as AWS from "aws-sdk";
AWS.config.update({ region: process.env.AWS_REGION });
const kms = new AWS.KMS();

const decrypted: any = {};

const decrypt = (secretName: any) => {
  if (decrypted[secretName]) {
    return decrypted[secretName];
  }
  try {
    const req = {
      CiphertextBlob: Buffer.from((process.env as any)[secretName], "base64"),
    };
    let decryptedVal: any;
    kms
      .decrypt(req)
      .promise()
      .then((data: any) => {
        decryptedVal = data?.Plaintext.toString("ascii");
        decrypted[secretName] = decryptedVal;
      });
    return decryptedVal;
  } catch (err) {
    console.log("decrypt error:", err);
    throw err;
  }
};

export const secrets = {
  decrypt,
};
