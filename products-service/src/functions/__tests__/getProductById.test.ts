const mockGetProductById = jest.fn();

import { handler } from '../getProductById';
import products from './mocks/products.json';

jest.mock('../../services/products-service', () => ({
  ProductsService: {
    getProductById: mockGetProductById,
  },
}));

const eventPayload: any = { pathParameters: { productId: '1' } };

describe('getProductById tests', () => {
  it('should return correct response', async () => {
    mockGetProductById.mockImplementationOnce(() => Promise.resolve(products[0]));
    const { statusCode, body } = await handler(eventPayload);
    expect(body).toEqual(JSON.stringify(products[0]));
    expect(statusCode).toEqual(200);
  });

  it('should return error response', async () => {
    mockGetProductById.mockImplementationOnce(() =>
      Promise.reject({ message: 'Internal server error!' }),
    );
    const { statusCode, body } = await handler(eventPayload);
    expect(body).toEqual(JSON.stringify({ message: 'Internal server error!' }));
    expect(statusCode).toEqual(500);
  });
});
