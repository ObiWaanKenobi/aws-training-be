import { APIGatewayProxyEvent } from 'aws-lambda';
import { validationSchema } from './validationSchema';
import { createSuccessResponse, createErrorResponse } from '../../utils/apiResponse';
import { Product } from '../../types/product';
import { ProductsService } from '../../services/products-service';
import { HttpError } from '../../utils/errors';
import { HttpCodes } from '../../types/httpCodes';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const product: Product = JSON.parse(event.body);

    console.log('createProduct lambda body', product);

    const { error } = validationSchema.validate(product, { allowUnknown: false });
    if (error) throw new HttpError(`Product body is not valid!: ${error}`, HttpCodes.BAD_REQUEST);

    const newProduct = await ProductsService.createProduct(product);

    return createSuccessResponse(newProduct);
  } catch (error) {
    return createErrorResponse(error);
  }
};
