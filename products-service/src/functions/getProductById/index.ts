import { APIGatewayProxyEvent } from 'aws-lambda';
import { createSuccessResponse, createErrorResponse } from '../../utils/apiResponse';
import { get } from '../../utils/fetchApi';
import { HttpCodes } from '../../types/httpCodes';

const productsUrl = 'https://fakestoreapi.com/products';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const productId = event.pathParameters.productId;
    const { data: product } = await get(`${productsUrl}/${productId}`);

    if (!product) return createErrorResponse('Product not found!', HttpCodes.NOT_FOUND);

    return createSuccessResponse(product);
  } catch (error) {
    return createErrorResponse(error);
  }
};
