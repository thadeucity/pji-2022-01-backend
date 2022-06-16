import { Request, Response } from "express";

import { container } from 'tsyringe';

import {
  AuthenticateCompanyService
} from '@modules/companies/services/AuthenticateCompanyService';

export class CompaniesSessionController {
  public async add(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body || {};

    console.log({ email, password });

    const authenticateCompany = container.resolve(AuthenticateCompanyService);


    const company = await authenticateCompany.execute({ email, password });

    console.log({ company });

    return res.json(company)
  }
}
