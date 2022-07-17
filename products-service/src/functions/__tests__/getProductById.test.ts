const mockGet = jest.fn();

import { handler } from '../getProductById';
import products from './mocks/products.json';

jest.mock('../../utils/fetchApi', () => ({
  get: mockGet,
}));

const eventPayload: any = { pathParameters: { productId: '1' } };

describe('getProductById tests', () => {
  it('should return correct response', async () => {
    mockGet.mockImplementationOnce(() => Promise.resolve({ data: products[0] }));
    const { statusCode, body } = await handler(eventPayload);
    expect(body).toEqual(JSON.stringify(products[0]));
    expect(statusCode).toEqual(200);
  });

  it('should return error response', async () => {
    mockGet.mockImplementationOnce(() => Promise.resolve({ data: null }));
    const { statusCode, body } = await handler(eventPayload);
    expect(body).toEqual(JSON.stringify({ message: 'Product not found!' }));
    expect(statusCode).toEqual(404);
  });
});
