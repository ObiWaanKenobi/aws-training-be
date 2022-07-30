import AWS from 'aws-sdk';
import csv from 'csv-parser';
import { S3Event } from 'aws-lambda';
import { createSuccessResponse, createErrorResponse } from '../../utils/apiResponse';

const { productsFilesBucket } = process.env;

export const handler = async (event: S3Event) => {
  try {
    const s3Client = new AWS.S3();
    for (const record of event.Records) {
      console.log(`s3 event record: ${JSON.stringify(record)}`);

      await new Promise((resolve, reject) => {
        s3Client
          .getObject({ Bucket: productsFilesBucket, Key: record.s3.object.key })
          .createReadStream()
          .pipe(csv())
          .on('data', (data) => console.log(`parsed csv file: ${JSON.stringify(data)}`))
          .on('error', (error) => {
            console.log(error);
            reject(error);
          })
          .on('end', async () => {
            await s3Client
              .copyObject({
                Bucket: productsFilesBucket,
                CopySource: `${productsFilesBucket}/${record.s3.object.key}`,
                Key: record.s3.object.key.replace('uploaded', 'parsed'),
              })
              .promise();

            await s3Client
              .deleteObject({
                Bucket: productsFilesBucket,
                Key: record.s3.object.key,
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
