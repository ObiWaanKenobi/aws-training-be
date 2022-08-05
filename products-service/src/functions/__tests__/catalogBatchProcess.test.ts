import AWS from 'aws-sdk';
import AWSMock from 'aws-sdk-mock';
import { handler } from '../catalogBatchProcess';
import { HttpCodes } from '../../types/httpCodes';
import products from '../__tests__/mocks/productsEvent.json';

jest.mock('axios');

describe('catalogBatchProcess tests', () => {
  beforeEach(() => {
    AWSMock.setSDKInstance(AWS);
  });

  it('should return success response', async () => {
    AWSMock.mock('SNS', 'publish', Promise.resolve());

    const result = await handler(<any>{ Records: products });
    expect(result.statusCode).toBe(HttpCodes.OK);

    AWSMock.restore('SNS');
  });

  it('should return error response', async () => {
    AWSMock.mock('SNS', 'publish', Promise.reject('error'));

    const result = await handler(<any>{ Records: products });
    expect(result.statusCode).toBe(HttpCodes.INTERNAL_SERVER_ERROR);
    expect(JSON.parse(result.body).message).toBe('error');
  });
});
