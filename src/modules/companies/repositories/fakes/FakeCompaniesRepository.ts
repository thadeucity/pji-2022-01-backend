import { Company } from '@prisma/client';
import { uuid } from 'uuidv4';

import { ICompaniesRepository } from '@modules/companies/repositories/ICompaniesRepository';
import { ICreateCompanyDTO } from '@modules/companies/dtos/ICreateCompanyDTO';


class FakeCompaniesRepository implements ICompaniesRepository {
  private companies: Company[] = [];

  public async findById(id: string): Promise<Company | null> {
    const foundCompany = this.companies.find(company => company.id === id);
    return foundCompany || null;
  }

  public async findByEmail(email: string): Promise<Company | null> {
    const foundCompany = this.companies.find(company => company.email === email);
    return foundCompany || null;
  }

  public async findByUrl(url: string): Promise<Company | null> {
    const foundCompany = this.companies.find(company => company.url === url);
    return foundCompany || null;
  }

  public async findBy(props: Partial<Omit<Company, 'password'>>): Promise<Company | null> {
    const foundCompany = this.companies.find(company => {
      return Object.keys(props).every((key) => {
        const safeKey = key as keyof typeof props;
        return company[safeKey] === props[safeKey]
      });
    });

    return foundCompany || null;
  }

  public async create(userData: ICreateCompanyDTO): Promise<Company> {
    const company: Company = {
      id: uuid(),
      created_at: new Date(),
      updated_at: new Date(),
      about: null,
      profile_image: null,
      ...userData,
    };

    this.companies.push(company);

    return company;
  }

  public async update(updatedCompany: Partial<Company>): Promise<Company> {
    const findIndex = this.companies.findIndex(
      company => company.id === updatedCompany.id
    );

    this.companies[findIndex] = {
      ...this.companies[findIndex],
      ...updatedCompany,
    };

    return this.companies[findIndex];
  }

  public async delete(id: string): Promise<string> {
    const findIndex = this.companies.findIndex(company => company.id === id);

    this.companies.splice(findIndex, 1);

    return id;
  }
}

export { FakeCompaniesRepository };
