import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@providers/HashProvider/models/IHashProvider';

import { ICompaniesRepository } from '../repositories/ICompaniesRepository';
import { ICreateCompanyServiceRes } from '../dtos/ICreateCompanyDTO';


interface IRequest {
  name: string
  email: string
  password: string
  logo: string
  phone: string
  primaryColor: string
  secondaryColor: string
  url: string
}

@injectable()
export class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companies: ICompaniesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    logo,
    phone,
    primaryColor,
    secondaryColor,
    url,
  }: IRequest): Promise<ICreateCompanyServiceRes> {
    const checkCompanyExists = await this.companies.findBy({
      email,
      url
    });

    if (checkCompanyExists) {
      if (checkCompanyExists.email === email) {
        throw new AppError('Email address already used.');
      } else {
        throw new AppError('URL already used.');
      }
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const newCompany = await this.companies.create({
      name,
      email,
      password: hashedPassword,
      logo,
      phone,
      primary_color: primaryColor,
      secondary_color: secondaryColor,
      url
    });

    return {
      id: newCompany.id,
      name: newCompany.name,
      email: newCompany.email,
      phone: newCompany.phone,
      url: newCompany.url,
      logo: newCompany.logo || null,
      primaryColor: newCompany.primary_color || null,
      secondaryColor: newCompany.secondary_color || null,
    };
  }
}
