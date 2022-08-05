import AWS from 'aws-sdk';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { createSuccessResponse, createErrorResponse } from '../../utils/apiResponse';
import { HttpError } from '../../utils/errors';
import { HttpCodes } from '../../types/httpCodes';

const { productsFilesBucket } = process.env;

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const fileName = event.queryStringParameters.name;
    console.log(`Event file name: ${fileName}`);

    if (!fileName) throw new HttpError('Invalid file name!', HttpCodes.BAD_REQUEST);

    const s3Client = new AWS.S3();
    const params = {
      Bucket: productsFilesBucket,
      Key: `uploaded/${fileName}`,
      Expires: 60,
      ContentType: 'text/csv',
    };

    const url = await s3Client.getSignedUrlPromise('putObject', params);

    console.log(`Created signed url: ${url}`);

    return createSuccessResponse(url);
  } catch (error) {
    return createErrorResponse(error);
  }
};
