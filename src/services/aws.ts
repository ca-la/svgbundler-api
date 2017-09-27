import * as AWS from 'aws-sdk';

import {
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY
} from '../config';

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY
});

export function upload(
  buffer: Buffer,
  bucketName: string,
  remoteFileName: string,
  contentType: string = 'binary/octet-stream',
  ACL: string = 'authenticated-read'
): Promise<string> {
  const s3 = new AWS.S3();

  return s3.putObject({
    ACL,
    Body: buffer,
    Bucket: bucketName,
    ContentType: contentType,
    Key: remoteFileName,
    ServerSideEncryption: 'AES256'
  }).promise()
    .then((): string => {
      return `https://${bucketName}.s3.amazonaws.com/${remoteFileName}`;
    });
}
