export interface ICreateCompanyDTO {
  name: string
  email: string
  password: string
  url: string
  phone: string
  logo: string | null
  primary_color: string | null
  secondary_color: string | null
}

export interface ICreateCompanyServiceRes {
  id: string
  name: string
  email: string
  phone: string
  url: string
  logo: string | null
  primaryColor: string | null
  secondaryColor: string | null
}
