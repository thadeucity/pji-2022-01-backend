import { injectable, inject } from 'tsyringe';
import { Company } from '@prisma/client';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@providers/HashProvider/models/IHashProvider';

import { ICompaniesRepository } from '../repositories/ICompaniesRepository';

interface IRequest {
  id: string,
  password: string
}

interface IResponse {
  id: string
}

@injectable()
export class EditCompanyPasswordService {
  constructor(
    @inject('CompaniesRepository')
    private companies: ICompaniesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ id, password }: IRequest): Promise<IResponse> {
    const company = await this.companies.findById(id);

    if (!company) {
      throw new AppError('Company not found.', 404);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const updatedPayload: Partial<Company> = {
      id: company.id,
      password: hashedPassword,
    }

    const updatedCompany = await this.companies.update(updatedPayload);

    return {
      id: updatedCompany.id,
    };
  }
}
