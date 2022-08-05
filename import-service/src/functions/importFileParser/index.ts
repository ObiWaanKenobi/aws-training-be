import AWS from 'aws-sdk';
import csv from 'csv-parser';
import { S3Event } from 'aws-lambda';
import { createSuccessResponse, createErrorResponse } from '../../utils/apiResponse';

const { PRODUCTS_FILES_BUCKET, PRODUCTS_SQS_URL } = process.env;

export const handler = async (event: S3Event) => {
  try {
    const s3Client = new AWS.S3();
    const sqs = new AWS.SQS();

    for (const record of event.Records) {
      console.log(`s3 event record: ${JSON.stringify(record)}`);
      const key = record.s3.object.key;

      await new Promise((_, reject) => {
        s3Client
          .getObject({ Bucket: PRODUCTS_FILES_BUCKET, Key: key })
          .createReadStream()
          .pipe(csv())
          .on('data', async (data) => {
            const product = JSON.stringify(data);
            console.log(`parsed csv file: ${product}`);

            const message = await sqs
              .sendMessage({
                QueueUrl: PRODUCTS_SQS_URL,
                MessageBody: product,
              })
              .promise();

            console.log(`Message was sent into sqs queue: ${JSON.stringify(message)}`);
          })
          .on('error', (error) => {
            console.log(error);
            reject(error);
          })
          .on('end', async () => {
            await s3Client
              .copyObject({
                Bucket: PRODUCTS_FILES_BUCKET,
                CopySource: `${PRODUCTS_FILES_BUCKET}/${key}`,
                Key: key.replace('uploaded', 'parsed'),
              })
              .promise();

            await s3Client
              .deleteObject({
                Bucket: PRODUCTS_FILES_BUCKET,
                Key: key,
              })
              .promise();
          });
      });
    }

    return createSuccessResponse({});
  } catch (error) {
    return createErrorResponse(error);
  }
};
