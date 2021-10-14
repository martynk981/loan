import { DataMapper, ItemNotFoundException, QueryIterator } from '@aws/dynamodb-data-mapper';
import { LoanEntity, tableConfig } from '../entities/loan-entity';

export class LoanRepository {
  constructor(private dataMapper: DataMapper) {}

  async getLoanById(loanId: string): Promise<LoanEntity | undefined> {
    let result;

    const loanEntity = new LoanEntity();
    loanEntity.loanId = loanId;
    try {
      result = await this.dataMapper.get(loanEntity);
    } catch (error) {
      if (error instanceof ItemNotFoundException) {
        return undefined;
      }
      throw error;
    }

    return result;
  }

  getLoansByCompanyId(companyId: string): QueryIterator<LoanEntity> {
    return this.dataMapper.query(
      LoanEntity,
      { companyId },
      { indexName: tableConfig.secondaryIndexName },
    );
  }

  putLoan(loanEntity: LoanEntity): Promise<LoanEntity> {
    return this.dataMapper.put(loanEntity);
  }

  deleteLoan(loan: LoanEntity): Promise<LoanEntity> {
    return this.dataMapper.delete(loan);
  }
}
