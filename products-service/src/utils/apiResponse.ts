import { HttpCodes } from '../types/httpCodes';

export const createSuccessResponse = (body, statusCode = HttpCodes.OK) => {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
};

export const createErrorResponse = (error, statusCode = HttpCodes.INTERNAL_SERVER_ERROR) => {
  return {
    statusCode,
    body: JSON.stringify({ message: error }),
  };
};
