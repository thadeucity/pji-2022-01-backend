import { Company } from '@prisma/client';
import {ICreateCompanyDTO} from '../dtos/ICreateCompanyDTO';

export interface ICompaniesRepository {
  findById(id: string): Promise<Company | null>;
  findByUrl(url: string): Promise<Company | null>;
  findByEmail(email: string): Promise<Company | null>;
  findBy(props: Partial<Omit<Company, 'password'>>): Promise<Company | null>;
  create(data: ICreateCompanyDTO): Promise<Company>;
  update(payload: Partial<Company>): Promise<Company>;
  delete(id: string): Promise<string>;
}
