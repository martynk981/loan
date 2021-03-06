import { attribute, autoGeneratedHashKey, table } from '@aws/dynamodb-data-mapper-annotations';

export const tableConfig = {
  tableName: 'loan',
  secondaryIndexName: 'company_loan_index',
};

@table(tableConfig.tableName)
export class LoanEntity {
  @autoGeneratedHashKey()
  loanId: string;

  @attribute()
  companyId: string;

  @attribute()
  amount: number;

  @attribute()
  loanStatus: string;

  @attribute()
  companyInfo: string;

  @attribute({ defaultProvider: () => new Date() })
  timestamp: Date;
}
