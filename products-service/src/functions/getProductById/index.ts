import { APIGatewayProxyEvent } from 'aws-lambda';
import { createSuccessResponse, createErrorResponse } from '../../utils/apiResponse';
import { ProductsService } from '../../services/products-service';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    console.log('getProductById lambda path params', event.pathParameters);

    const productId = event.pathParameters.productId;
    const product = await ProductsService.getProductById(productId);

    return createSuccessResponse(product);
  } catch (error) {
    return createErrorResponse(error);
  }
};
