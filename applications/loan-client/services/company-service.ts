import got, { Got, HTTPError } from 'got';
import { CompanyInfoDto } from '../types';

export class CompanyService {
  private client: Got;

  constructor(private apiUrl: string, private apiKey: string) {
    this.client = got.extend({
      prefixUrl: this.apiUrl,
      headers: {
        'ovio-api-key': this.apiKey,
      },
    });
  }

  async getCompanyInfo(companyId: string): Promise<CompanyInfoDto | undefined> {
    try {
      return await this.client(companyId).json<CompanyInfoDto>();
    } catch (error) {
      if (error instanceof HTTPError && error.response.statusCode === 404) {
        return undefined;
      }
      throw error;
    }
  }
}
