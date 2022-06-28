import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class CompaniesPublicController {
  public async readByUrl(req: Request, res: Response): Promise<Response> {
    const { url } = req.params || {};

    console.log({url, pr: req.params, req: req.body});

    const company = await prisma.company.findUnique({
      where: {
        url: url
      }
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
      about: company.about,
      profilePicture: company.profile_image
    })
  }
}
