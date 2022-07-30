const mockGetProductsList = jest.fn();

import { handler } from '../getProductsList';
import products from './mocks/products.json';

jest.mock('../../services/products-service', () => ({
  ProductsService: {
    getProductsList: mockGetProductsList,
  },
}));

describe('getProductsList tests', () => {
  it('should return correct response', async () => {
    mockGetProductsList.mockImplementationOnce(() => Promise.resolve(products));
    const { statusCode, body } = await handler();
    expect(body).toEqual(JSON.stringify(products));
    expect(statusCode).toEqual(200);
  });

  it('should return error response', async () => {
    mockGetProductsList.mockImplementationOnce(() =>
      Promise.reject({ message: 'Internal server error!' }),
    );
    const { statusCode, body } = await handler();
    expect(body).toEqual(JSON.stringify({ message: 'Internal server error!' }));
    expect(statusCode).toEqual(500);
  });
});
