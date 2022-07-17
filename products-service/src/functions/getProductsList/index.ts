import { createSuccessResponse, createErrorResponse } from '../../utils/apiResponse';
import { get } from '../../utils/fetchApi';
import { HttpCodes } from '../../types/httpCodes';

const productsUrl = 'https://fakestoreapi.com/products';

export const handler = async () => {
  try {
    const { data: products } = await get(productsUrl);

    if (!products) return createErrorResponse('Products not found!', HttpCodes.NOT_FOUND);

    return createSuccessResponse(products);
  } catch (error) {
    return createErrorResponse(error);
  }
};
