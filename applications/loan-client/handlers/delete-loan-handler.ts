import { eventHandlerMiddleware } from '../middlewares/handler-middleware';
import { LoanHandler } from '../types';
import { ApiResponse } from '../lib/api-response';
import { deleteLoanSchema } from '../schemas';

export const deleteLoan: LoanHandler = async (event, context) => {
  const { error, value } = deleteLoanSchema.validate(event.pathParameters || {});
  if (error) {
    return ApiResponse._400(error.message);
  }

  const { loanService } = context;
  const loan = await loanService.getLoanById(value.loanId);
  if (!loan) {
    return ApiResponse._404('Loan not found');
  }

  await loanService.deleteLoan(loan);
  return ApiResponse._201();
};

export const handler = eventHandlerMiddleware(deleteLoan);
