const mockGet = jest.fn();

import { handler } from '../getProductsList';
import products from './mocks/products.json';

jest.mock('../../utils/fetchApi', () => ({
  get: mockGet,
}));

describe('getProductsList tests', () => {
  it('should return correct response', async () => {
    mockGet.mockImplementationOnce(() => Promise.resolve({ data: products }));
    const { statusCode, body } = await handler();
    expect(body).toEqual(JSON.stringify(products));
    expect(statusCode).toEqual(200);
  });

  it('should return error response', async () => {
    mockGet.mockImplementationOnce(() => Promise.resolve({ data: null }));
    const { statusCode, body } = await handler();
    expect(body).toEqual(JSON.stringify({ message: 'Products not found!' }));
    expect(statusCode).toEqual(404);
  });
});
