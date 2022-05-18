import { injectable, inject } from 'tsyringe';
import { Company } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import { ICompaniesRepository } from '../repositories/ICompaniesRepository';

interface IRequest {
  id: string,
  payload: {
    name: string
    email: string
    logo: string
    phone: string
    primaryColor: string
    secondaryColor: string
    url: string
  }
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
export class EditCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companies: ICompaniesRepository,
  ) {}

  public async execute({ id, payload }: IRequest): Promise<IResponse> {
    const company = await this.companies.findById(id);

    if (!company) {
      throw new AppError('Company not found.', 404);
    }

    if (payload.email && payload.email !== company.email) {
      const checkCompanyExists = await this.companies.findBy({ email: payload.email });

      if (checkCompanyExists) {
        throw new AppError('Email address already used.');
      }
    }

    if (payload.url && payload.url !== company.url) {
      const checkCompanyExists = await this.companies.findBy({ url: payload.url });

      if (checkCompanyExists) {
        throw new AppError('URL already used.');
      }
    }

    const updatedPayload: Partial<Company> = {
      id: company.id,
      name: payload.name || company.name,
      email: payload.email || company.email,
      logo: payload.logo || company.logo,
      phone: payload.phone || company.phone,
      primary_color: payload.primaryColor || company.primary_color,
      secondary_color: payload.secondaryColor || company.secondary_color,
      url: payload.url || company.url
    }

    const updatedCompany = await this.companies.update(updatedPayload);

    return {
      id: updatedCompany.id,
      name: updatedCompany.name,
      email: updatedCompany.email,
      phone: updatedCompany.phone,
      url: updatedCompany.url,
      logo: updatedCompany.logo,
      primaryColor: updatedCompany.primary_color,
      secondaryColor: updatedCompany.secondary_color,
    };
  }
}
