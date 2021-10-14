import Joi from 'joi';

export const companyIdSchema = Joi.string().required();

export const loanAmountSchema = Joi.number().integer().required();

export const loanIdSchema = Joi.string().guid();

export const getCompanyLoansSchema = Joi.object({
  companyId: companyIdSchema,
});

export const createLoanSchema = Joi.object({
  companyId: companyIdSchema,
  amount: loanAmountSchema,
});

export const deleteLoanSchema = Joi.object({
  loanId: loanIdSchema,
});

export const disburseLoanSchema = Joi.object({
  loanId: loanIdSchema,
});
