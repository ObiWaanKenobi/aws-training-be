const mockCreateProduct = jest.fn();

import { handler } from '../createProduct';

jest.mock('../../services/products-service', () => ({
  ProductsService: {
    createProduct: mockCreateProduct,
  },
}));

const eventPayload =
  '{ "title": "Title", "description": "desc", "image_url": "url", "price": 278.99, "count": 2 }';

describe('createProduct tests', () => {
  it('should return correct response', async () => {
    mockCreateProduct.mockImplementationOnce(() => Promise.resolve(eventPayload));
    const { statusCode, body } = await handler(<any>{ body: eventPayload });
    expect(body).toEqual(JSON.stringify(eventPayload));
    expect(statusCode).toEqual(200);
  });
});
