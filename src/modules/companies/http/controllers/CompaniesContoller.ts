import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class CompaniesController {
  public async read(req: Request, res: Response): Promise<Response> {
    const { id } = req.params || {};

    const company = await prisma.company.findUnique({
      where: { id }
    })

    if (!company) {
      return res.status(404).json({
        message: 'company not found'
      })
    }

    return res.json({
      id: company.id,
      name: company.name,
      email: company.email,
      logo: company.logo,
      phone: company.phone,
      primaryColor: company.primary_color,
      secondaryColor: company.secondary_color,
      url: company.url,
    })
  }

  public async edit(req: Request, res: Response): Promise<Response> {
      const { id } = req.params || {};

      const {
        name,
        email,
        logo,
        phone,
        primaryColor,
        secondaryColor,
        url,
      } = req.body || {};

      const company = await prisma.company.findUnique({where: {id}});

      if (!company) {
        return res.status(404).json({
          message: 'company not found'
        })
      }

      const updatedCompany = await prisma.company.update({
        where: {id},
        data: {
          name: name || company.name,
          email: email || company.email,
          logo: logo || company.logo,
          phone: phone || company.phone,
          primary_color: primaryColor || company.primary_color,
          secondary_color: secondaryColor || company.secondary_color,
          url: url || company.url,
        }
      })

      return res.json({
        id: updatedCompany.id,
        name: updatedCompany.name,
        email: updatedCompany.email,
        logo: updatedCompany.logo,
        phone: updatedCompany.phone,
        primaryColor: updatedCompany.primary_color,
        secondaryColor: updatedCompany.secondary_color,
        url: updatedCompany.url,
      })
  }

  public async add(req: Request, res: Response): Promise<Response> {

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

    const newCompany = await prisma.company.create({
      data: {
        name: name,
        email: email,
        password: password,
        logo: logo,
        phone: phone,
        primary_color: primaryColor,
        secondary_color: secondaryColor,
        url: url,
      }
    })

    return res.json({
      message: 'company created',
      data: newCompany
    })
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params || {};

    const company = await prisma.company.findUnique({where: {id}});

    if (!company) {
      return res.status(404).json({
        message: 'company not found'
      })
    }

    await prisma.company.delete({where: {id}});

    return res.json({
      message: 'company deleted',
    })
  }
}
