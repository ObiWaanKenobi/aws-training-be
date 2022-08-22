import AWS from 'aws-sdk';
import { SQSEvent } from 'aws-lambda';
import { ProductsService } from '../../services/products-service';
import { createSuccessResponse, createErrorResponse } from '../../utils/apiResponse';

const { PRODUCTS_SNS_ARN } = process.env;

export const handler = async (event: SQSEvent) => {
  try {
    const products = event.Records.map(({ body }) => body);
    console.log(`catalogBatchProcess lambda products: ${products}`);
    const sns = new AWS.SNS();

    for (const product of products) {
      await ProductsService.createProduct(JSON.parse(product));

      const message = await sns
        .publish({
          Subject: 'Product was created!',
          TopicArn: PRODUCTS_SNS_ARN,
          Message: product,
          MessageAttributes: {
            productTitle: {
              DataType: 'String',
              StringValue: JSON.parse(product).title,
            },
            productPrice: {
              DataType: 'Number',
              StringValue: JSON.parse(product).price,
            },
          },
        })
        .promise();

      console.log(`Push message with created product: ${JSON.stringify(message)}`);
    }

    return createSuccessResponse('');
  } catch (error) {
    return createErrorResponse(error);
  }
};
