import { Context, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { CompanyService } from './services/company-service';
import { LoanService } from './services/loan-service';

export type LoanContext = Context & {
  loanService: LoanService;
  companyService: CompanyService;
};

export type LoanHandler = (
  event: APIGatewayProxyEvent,
  context: LoanContext,
) => Promise<APIGatewayProxyResult>;

export type HttpCodesSuccess = 200 | 201;

export type HttpCodesError = 400 | 404 | 500;

export type HttpCodes = HttpCodesSuccess | HttpCodesError;

export interface CompanyInfoDto {
  actief: boolean;
  [key: string]: any;
}

export interface LoanDto {
  loanId?: string;
  companyId?: string;
  amount?: number;
  loanStatus?: string;
  companyInfo?: CompanyInfoDto;
}
