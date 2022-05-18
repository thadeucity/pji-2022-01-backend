import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import { authConfig } from '@config/auth';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@providers/HashProvider/models/IHashProvider';

import { ICompaniesRepository } from '../repositories/ICompaniesRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  company: {
    id: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companies: ICompaniesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const company = await this.companies.findByEmail(email);

    if (!company) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      company.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // User Authenticated
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: company.id,
      expiresIn,
    });

    return {
      company: {
        id: company.id,
        email: company.email,
      },
      token,
    };
  }
}
