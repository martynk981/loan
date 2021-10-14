import { LoanEntity } from '../database/entities/loan-entity';
import { LoanRepository } from '../database/repositories/loan-repository';
import { LOAN_OFFERED, LOAN_DISBURSED } from '../lib/constants';
import { LoanDto } from '../types';

export class LoanService {
  constructor(private loanRepository: LoanRepository) {}

  getLoanById(loanId: string): Promise<LoanEntity | undefined> {
    return this.loanRepository.getLoanById(loanId);
  }

  async getCompanyLoans(companyId: string): Promise<LoanDto[]> {
    const loans: Array<LoanDto> = [];
    for await (const loan of this.loanRepository.getLoansByCompanyId(companyId)) {
      const loanDto = Object.assign({}, loan, { companyInfo: JSON.parse(loan.companyInfo) });
      loans.push(loanDto);
    }

    return loans;
  }

  async createCompanyLoan(loanDto: LoanDto): Promise<LoanEntity> {
    const loanEntity = new LoanEntity();

    loanEntity.companyId = loanDto.companyId;
    loanEntity.amount = loanDto.amount;
    loanEntity.loanStatus = LOAN_OFFERED;
    loanEntity.companyInfo = JSON.stringify(loanDto.companyInfo);

    return this.loanRepository.putLoan(loanEntity);
  }

  async deleteLoan(loan: LoanEntity): Promise<void> {
    await this.loanRepository.deleteLoan(loan);
  }

  async disburseLoan(loan: LoanEntity): Promise<void> {
    loan.loanStatus = LOAN_DISBURSED;
    await this.loanRepository.putLoan(loan);
  }
}
