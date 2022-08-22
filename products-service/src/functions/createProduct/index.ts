import { APIGatewayProxyEvent } from 'aws-lambda';
import { createSuccessResponse, createErrorResponse } from '../../utils/apiResponse';
import { Product } from '../../types/product';
import { ProductsService } from '../../services/products-service';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const product: Product = JSON.parse(event.body);
    console.log('createProduct lambda body', product);

    const newProduct = await ProductsService.createProduct(product);

    return createSuccessResponse(newProduct);
  } catch (error) {
    return createErrorResponse(error);
  }
};
