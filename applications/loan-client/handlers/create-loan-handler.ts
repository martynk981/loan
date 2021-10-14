import { eventHandlerMiddleware } from '../middlewares/handler-middleware';
import { LoanDto, LoanHandler } from '../types';
import { ApiResponse } from '../lib/api-response';
import { createLoanSchema } from '../schemas';

export const createLoan: LoanHandler = async (event, context) => {
  // @TODO add type for value
  const { error, value } = createLoanSchema.validate(JSON.parse(event.body));

  if (error) {
    return ApiResponse._400(error.message);
  }

  const { companyService } = context;
  const companyInfo = await companyService.getCompanyInfo(value.companyId);
  if (!companyInfo) {
    return ApiResponse._404('Company not found');
  }

  if (companyInfo.actief !== true) {
    return ApiResponse._404('Company is not active');
  }

  const { loanService } = context;

  const loanDto: LoanDto = {
    companyId: value.companyId,
    amount: value.amount,
    companyInfo: companyInfo,
  };

  await loanService.createCompanyLoan(loanDto);

  return ApiResponse._201();
};

export const handler = eventHandlerMiddleware(createLoan);
