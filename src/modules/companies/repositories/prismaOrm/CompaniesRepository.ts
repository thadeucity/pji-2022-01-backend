import { PrismaClient, Company, Prisma } from '@prisma/client';

import { ICreateCompanyDTO } from '@modules/companies/dtos/ICreateCompanyDTO';
import { ICompaniesRepository } from '../ICompaniesRepository';

class CompaniesRepository implements ICompaniesRepository {
  private ormRepository: Prisma.CompanyDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor() {
    this.ormRepository = new PrismaClient().company;
  }

  public async findById(id: string): Promise<Company | null> {
    const foundCompany = await this.ormRepository.findUnique({ where: { id } });
    return foundCompany;
  }

  public async findByEmail(email: string): Promise<Company | null> {
    const foundCompany = await this.ormRepository.findFirst({ where: { email } });
    return foundCompany;
  }

  public async findByUrl(url: string): Promise<Company | null> {
    const foundCompany = await this.ormRepository.findUnique({ where: { url } });
    return foundCompany;
  }

  public async create(companyData: ICreateCompanyDTO): Promise<Company> {
    const newCompany = this.ormRepository.create({
      data: { ...companyData }
    });

    return newCompany;
  }

  public async save(company: Company): Promise<Company> {
    return this.ormRepository.update({
      where: { id: company.id },
      data: company
    });
  }

  public async delete(id: string): Promise<string> {
    this.ormRepository.delete({ where: { id } });

    return id;
  }
}

export { CompaniesRepository };
