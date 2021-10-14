import { eventHandlerMiddleware } from '../middlewares/handler-middleware';
import { LoanHandler } from '../types';
import { ApiResponse } from '../lib/api-response';
import { getCompanyLoansSchema } from '../schemas';

export const getAllLoans: LoanHandler = async (event, context) => {
  const { error, value } = getCompanyLoansSchema.validate(event.pathParameters || {});

  if (error) {
    return ApiResponse._400(error.message);
  }

  const { loanService } = context;
  const loans = await loanService.getCompanyLoans(value.companyId);

  return ApiResponse._200(loans);
};

export const handler = eventHandlerMiddleware(getAllLoans);
