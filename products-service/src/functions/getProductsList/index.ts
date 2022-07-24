import { createSuccessResponse, createErrorResponse } from '../../utils/apiResponse';
import { ProductsService } from '../../services/products-service';

export const handler = async () => {
  try {
    const products = await ProductsService.getProductsList();
    return createSuccessResponse(products);
  } catch (error) {
    return createErrorResponse(error);
  }
};
