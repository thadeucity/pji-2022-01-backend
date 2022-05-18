import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { ICompaniesRepository } from '../repositories/ICompaniesRepository';

interface IRequest {
  id: string
}

interface IResponse {
  id: string
  name: string
  email: string
  phone: string
  url: string
  logo: string | null
  primaryColor: string | null
  secondaryColor: string | null
}

@injectable()
export class ReadCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companies: ICompaniesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const company = await this.companies.findById(id);

    if (!company) {
      throw new AppError('Company not found.', 404);
    }

    return {
      id: company.id,
      name: company.name,
      email: company.email,
      phone: company.phone,
      url: company.url,
      logo: company.logo,
      primaryColor: company.primary_color,
      secondaryColor: company.secondary_color,
    };
  }
}
