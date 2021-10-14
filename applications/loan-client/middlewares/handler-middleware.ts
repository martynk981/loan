import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';

import { companyServiceMiddleware } from './company-service-middleware';
import { loanServiceMiddleware } from './loan-service-middleware';

export const eventHandlerMiddleware = (baseHandler) => {
  return middy(baseHandler)
    .use(loanServiceMiddleware())
    .use(companyServiceMiddleware())
    .use(httpErrorHandler());
};
