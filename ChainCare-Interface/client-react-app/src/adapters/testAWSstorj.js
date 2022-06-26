import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  accessKeyId: "accessKeyId",
  secretAccessKey: "secretAccessKey",
  endpoint: "endpoint",
  s3ForcePathStyle: true,
  signatureVersion: "v4",
  connectTimeout: 0,
  httpOptions: { timeout: 0 },
});
