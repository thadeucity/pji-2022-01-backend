import { injectable, inject } from 'tsyringe';

import { ICompaniesRepository } from '../repositories/ICompaniesRepository';

interface IRequest {
  id: string
}

interface IResponse {
  id: string
}

@injectable()
export class DeleteCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companies: ICompaniesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const company = await this.companies.findById(id);

    if (company) {
      await this.companies.delete(id);
    }

    return { id };
  }
}
