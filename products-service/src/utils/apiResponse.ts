import { HttpCodes } from '../types/httpCodes';

export const createSuccessResponse = (body, statusCode = HttpCodes.OK) => {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
};

export const createErrorResponse = (error) => {
  return {
    statusCode: error.statusCode || HttpCodes.INTERNAL_SERVER_ERROR,
    body: JSON.stringify({ message: error.message || error }),
  };
};
