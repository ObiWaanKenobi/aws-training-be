import { HttpCodes } from '../types/httpCodes';

export class HttpError extends Error {
  statusCode: HttpCodes;

  constructor(message: string, statusCode?: HttpCodes) {
    super(message);
    this.statusCode = statusCode;
  }
}
