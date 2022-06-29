import "reflect-metadata"
import { CreateCompanyService } from '../CreateCompanyService';

import { FakeCompaniesRepository } from '../../repositories/fakes/FakeCompaniesRepository';
import FakeHashProvider from '@providers/HashProvider/fakes/FakeHashProvider';
import AppError from "@shared/errors/AppError";

let service: CreateCompanyService;
let fakeCompaniesRepository: FakeCompaniesRepository;
let fakeHashProvider: FakeHashProvider;

const createCompanyPayload = {
  email: 'test@mail.com',
  name: 'Test Company',
  logo: 'https://logo.com/logo.png',
  phone: '+5511999999999',
  password: '123456',
  primaryColor: '#FFF',
  secondaryColor: '#000',
  url: 'test-company.com'
}

describe('CreateCompanyService', () => {
  beforeEach(() => {
    fakeCompaniesRepository = new FakeCompaniesRepository();
    fakeHashProvider = new FakeHashProvider();

    service = new CreateCompanyService(
      fakeCompaniesRepository,
      fakeHashProvider
    );
  })

  it('should be able to create a new company', async () => {
    const newCompany = await service.execute(createCompanyPayload)

    expect(newCompany).toHaveProperty('id');
  })

  it('should not be able to create the same company twice', async () => {
    const newCompany = await service.execute(createCompanyPayload)

    expect(newCompany).toHaveProperty('id')

    await expect(service.execute(createCompanyPayload)).rejects.toBeInstanceOf(AppError)
  })

  it('should hash the password before storing it', async () => {
    const newCompany = await service.execute(createCompanyPayload)

    expect(newCompany).toHaveProperty('id')

    const storedCompany = await fakeCompaniesRepository.findById(newCompany?.id)
    const hashedPassword = await fakeHashProvider.generateHash(createCompanyPayload.password)

    expect(storedCompany?.password).not.toBe(createCompanyPayload.password)
    expect(storedCompany?.password).toBe(hashedPassword)
  })

  it('should not return the hashed password to the controller', async () => {
    const newCompany = await service.execute(createCompanyPayload)

    expect(newCompany).toHaveProperty('id')
    expect(newCompany).not.toHaveProperty('password')
  })
})
