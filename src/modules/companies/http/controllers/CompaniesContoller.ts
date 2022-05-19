import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
import { container } from 'tsyringe';

import { CreateCompanyService } from '@modules/companies/services/CreateCompanyService';
import { ReadCompanyService } from '@modules/companies/services/ReadCompanyService';
import { EditCompanyService } from '@modules/companies/services/EditCompanyService';
import { DeleteCompanyService } from "@modules/companies/services/DeleteCompanyService";
import { EditCompanyPasswordService } from "@modules/companies/services/EditCompanyPasswordService";
import AppError from "@shared/errors/AppError";

export class CompaniesController {
  public async read(req: Request, res: Response): Promise<Response> {
    const { id } = req.params || {};

    const readCompany = container.resolve(ReadCompanyService);

    const company = await readCompany.execute({id});

    return res.json(company)
  }

  public async edit(req: Request, res: Response): Promise<Response> {
    const { id } = req.params || {};
    const { id: reqId } = req.company || {};

    if(id !== reqId) {
      throw new AppError('You can only edit your own company', 401);
    }

    const editCompany = container.resolve(EditCompanyService);

      const {
        name,
        email,
        logo,
        phone,
        primaryColor,
        secondaryColor,
        url,
      } = req.body || {};

      const updatedCompany = await editCompany.execute({
        id,
        payload: {
          name,
          email,
          logo,
          phone,
          primaryColor,
          secondaryColor,
          url,
        }
      });

      return res.json(updatedCompany)
  }

  public async editPassword(req: Request, res: Response): Promise<Response> {
    const { id } = req.params || {};
    const { id: reqId } = req.company || {};

    if(id !== reqId) {
      throw new AppError('You can only edit your own company', 401);
    }

    const { password } = req.body || {};

    const editCompanyPassword = container.resolve(EditCompanyPasswordService);

    const updatedCompanyId = await editCompanyPassword.execute({
      id, password
    })

    return res.json({
      id: updatedCompanyId.id,
    })
  }

  public async add(req: Request, res: Response): Promise<Response> {

    const createCompany = container.resolve(CreateCompanyService);

    const {
      name,
      email,
      password,
      logo,
      phone,
      primaryColor,
      secondaryColor,
      url,
    } = req.body || {};

    const newCompany = await createCompany.execute({
      name,
      email,
      password,
      logo,
      phone,
      primaryColor,
      secondaryColor,
      url,
    })

    return res.json({
      message: 'Company Created',
      data: newCompany
    })
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params || {};
    const { id: reqId } = req.company || {};

    if(id !== reqId) {
      throw new AppError('You can only delete your own company', 401);
    }

    const deleteCompany = container.resolve(DeleteCompanyService);

    const deletedCompanyId = await deleteCompany.execute({ id })

    return res.json({
      message: `Company - ${deletedCompanyId} - Deleted`,
    })
  }
}
