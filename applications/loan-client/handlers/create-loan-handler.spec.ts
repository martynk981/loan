import { APIGatewayProxyEvent } from 'aws-lambda';

import { createLoan } from './create-loan-handler';
import { LoanService } from '../services/loan-service';
import { LoanContext } from '../types';
import { CompanyService } from '../services/company-service';

const contextMock = {
  loanService: {
    createCompanyLoan: jest.fn().mockResolvedValue({
      loanId: 'loan-id',
      companyId: 'company',
      amount: 42,
      loanStatus: 'offered',
    }) as unknown as LoanService,
  },
} as unknown as LoanContext;

describe('create-loan handler', () => {
  it('should return 200 status and create new loan', async () => {
    // given
    const eventMock = {
      body: JSON.stringify({
        companyId: 'company',
        amount: 42,
      }),
    } as unknown as APIGatewayProxyEvent;

    contextMock.companyService = {
      getCompanyInfo: jest.fn().mockResolvedValue({
        actief: true,
        name: 'company name',
      }),
    } as unknown as CompanyService;

    // when
    const response = await createLoan(eventMock, contextMock);

    // then
    expect(response).toStrictEqual({
      statusCode: 201,
      body: undefined,
    });
    expect(contextMock.loanService.createCompanyLoan).toBeCalledWith({
      companyId: 'company',
      amount: 42,
      companyInfo: {
        actief: true,
        name: 'company name',
      },
    });
  });

  it('should return 400 when validation fails', async () => {
    // given
    const eventMock = {
      body: JSON.stringify({
        amount: 42,
      }),
    } as unknown as APIGatewayProxyEvent;

    // when
    const response = await createLoan(eventMock, contextMock);

    // then
    expect(response).toStrictEqual({
      statusCode: 400,
      body: JSON.stringify({
        message: '"companyId" is required',
      }),
    });
    expect(contextMock.loanService.createCompanyLoan).not.toHaveBeenCalled();
  });
});
