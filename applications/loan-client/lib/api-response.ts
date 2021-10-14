import { HttpCodesError, HttpCodesSuccess } from '../types';

function buildSuccessResponse(statusCode: HttpCodesSuccess, response?: Record<string, any>) {
  return {
    statusCode,
    body: JSON.stringify(response),
  };
}

function buildErrorResponse(statusCode: HttpCodesError, message: string) {
  return {
    statusCode,
    body: JSON.stringify({ message }),
  };
}

export const ApiResponse = {
  _200: (response: Record<string, any>) => buildSuccessResponse(200, response),
  _201: () => buildSuccessResponse(201),
  _400: (message: string) => buildErrorResponse(400, message),
  _404: (message: string) => buildErrorResponse(404, message),
  _500: (message: string) => buildErrorResponse(500, message),
};
