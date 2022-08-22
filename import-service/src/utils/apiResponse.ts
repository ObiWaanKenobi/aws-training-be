import { HttpCodes } from '../types/httpCodes';

const defaultHeaders = {
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Origin': '*',
};

export const createSuccessResponse = (body, statusCode = HttpCodes.OK) => {
  return {
    statusCode,
    headers: defaultHeaders,
    body: typeof body === 'string' ? body : JSON.stringify(body),
  };
};

export const createErrorResponse = (error) => {
  console.log(`An error was occured! - ${error}`);

  return {
    statusCode: error?.statusCode || HttpCodes.INTERNAL_SERVER_ERROR,
    headers: defaultHeaders,
    body: JSON.stringify({ message: error?.message || error }),
  };
};
