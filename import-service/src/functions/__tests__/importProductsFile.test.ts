import AWS from 'aws-sdk';
import AWSMock from 'aws-sdk-mock';
import { handler } from '../importProductsFile';
import { HttpCodes } from '../../types/httpCodes';

describe('importProductsFile tests', () => {
  it('should return success response', async () => {
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('S3', 'getSignedUrl', 'csv_url.com');

    const result = await handler(<any>{ queryStringParameters: { name: 'file.csv' } });
    expect(result.statusCode).toBe(HttpCodes.OK);
    expect(result.body).toBe('csv_url.com');
  });
});
