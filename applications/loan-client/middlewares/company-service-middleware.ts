import { CompanyService } from '../services/company-service';

const companyService = new CompanyService(process.env.OPEN_KVK_URL, process.env.OPEN_KVK_API_KEY);

export const companyServiceMiddleware = () => ({
  before: async ({ context }) => {
    Object.assign(context, {
      companyService,
    });
  },
});
