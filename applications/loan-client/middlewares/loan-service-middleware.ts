import { LoanRepository } from '../database/repositories/loan-repository';
import { dataMapperFactory } from '../database/data-mapper';
import { LoanService } from '../services/loan-service';

const loanRepository = new LoanRepository(dataMapperFactory());
const loanService = new LoanService(loanRepository);

export const loanServiceMiddleware = () => ({
  before: async ({ context }) => {
    Object.assign(context, {
      loanService,
    });
  },
});
