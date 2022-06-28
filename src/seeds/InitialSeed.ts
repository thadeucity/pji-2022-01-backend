import { PrismaClient, Company } from '@prisma/client'
import { resetDatabase } from "./resetDatabase"
import BCryptHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider'


const HashProviver = new BCryptHashProvider()

const createCompaniesData: () => Promise<Omit<Company, 'created_at' | 'updated_at' | 'id'>[]> = async () => {
  const passwordHash = await HashProviver.generateHash('1234')
  const [ env = 'develop' ] = process.argv.slice(2);

  const imgEnv = env === 'prod'
    ? 'https://pjiapi.soapmanager.com'
    : 'http://localhost:3333'

  return [
    {
      name: "Bolos do João",
      email: "joão@mail.com",
      password: passwordHash,
      logo: `${imgEnv}/images/866fa8bbdb2e495d98cad65a36ee3491.png`,
      phone: "5516996381316",
      primary_color: "#9188E5",
      secondary_color: "#5D52C9",
      url: env === 'prod' ? 'bolos-do-joao.vercel.app' : 'localhost:3000',
      about: `*Os melhores bolos da região de Ribeirão Preto.*
Bolos caseiros feitos com muito amor, entregues direto na sua casa.
Trabalho com ingredientes de primeira qualidade para te entregar produtos de dar água na boca.
Possuo mais de 20 anos de experiência na confecção de bolos e garanto que você não irá se arrepender.`,
      profile_image: `${imgEnv}/images/joao.jpg`,
    },
    {
      name: "Maria's Cake",
      email: "maria@mail.com",
      password: passwordHash,
      logo: `${imgEnv}/images/bb56d8325f494e7fbfe947b49dfe84ae.png`,
      phone: "5516996381316",
      primary_color: "#F28AA5",
      secondary_color: "#fe4b74",
      url: env === 'prod' ? 'marias-cake.vercel.app' : 'localhost:3001',
      about: `*Bolos feitos com muito carinho para você.*
Bolos artesanais feitos com muito amor, pertinho de você.
Os bolos mais gostosos de toda a região de Ribeirão Preto, preparados com os melhores ingredientes.
Tenho certeza que você irá se surpreender com meus bolos.`,
      profile_image: `${imgEnv}/images/maria.jpg`,
    }
  ]
}

const baseIngredients = [
  {
    name: "Cenoura",
    description: "Massa de bolo de cenoura",
    category: "base",
  },
  {
    name: "Branco",
    description: "Massa de bolo simples",
    category: "base",
  },
  {
    name: "Fubá",
    description: "Massa de bolo de fubá",
    category: "base",
  },
  {
    name: "Milho",
    description: "Massa de bolo de milho",
    category: "base",
  },
  {
    name: "Chocolate",
    description: "Massa de bolo de chocolate",
    category: "base",
  }
]

const fillingIngredients = [
  {
    name: "Chocolate",
    description: "Recheio chocolate",
    category: "filling",
  },
  {
    name: "Leite condensado",
    description: "Recheio creme de leite condensado",
    category: "filling",
  },
  {
    name: "Doce de leite",
    description: "Recheio doce de leite",
    category: "filling",
  },
  {
    name: "Coco",
    description: "Recheio de coco",
    category: "filling",
  },
  {
    name: "Morango",
    description: "Recheio de morango com leite condençado",
    category: "filling",
  },
  {
    name: "Prestígio",
    description: "Recheio de coco com leite condençado",
    category: "filling",
  },
  {
    name: "Chocolate Branco",
    description: "Recheio de chocolate branco",
    category: "filling",
  },
  {
    name: "Abacaxi",
    description: "Recheio de abacaxi em calda",
    category: "filling",
  },
  {
    name: "Frutas vermelhas",
    description: "Recheio de frutas vermelhas frescas com creme branco",
    category: "filling",
  }
]

const frostingIngredients = [
  {
    name: "Chocolate",
    description: "Cobertura de chocolate",
    category: "frosting",
  },
  {
    name: "Calda de limão",
    description: "Cobertura de calda de limão",
    category: "frosting",
  },
  {
    name: "Brigadeiro",
    description: "Cobertura de brigadeiro",
    category: "frosting",
  },
  {
    name: "Pasta Americana",
    description: "Cobertura de pasta americana",
    category: "frosting",
  },
  {
    name: "Calda de laranja",
    description: "Cobertura de calda de laranja",
    category: "frosting",
  },
  {
    name: "Açúcar com canela",
    description: "Cobertura de açúcar com canela",
    category: "frosting",
  },
  {
    name: "Pistache",
    description: "Cobertura de creme de pistache",
    category: "frosting",
  },
  {
    name: "Caramelo Cremoso",
    description: "Cobertura de caramelo cremoso",
    category: "frosting",
  }
]

const extraIngredients = [
  {
    name: "Morango em pedaços",
    description: "Pedaços de morango",
    category: "extra",
  },
  {
    name: "Chocolate em pedaços",
    description: "Lascas de chocolate",
    category: "extra",
  },
  {
    name: "Nozes",
    description: "Nozes picadas",
    category: "extra",
  },
  {
    name: "Coco ralado",
    description: "Coco ralado",
    category: "extra",
  },
  {
    name: "Pistache",
    description: "Pistache em pedaços",
    category: "extra",
  }
]

let companiesIds: string[] = []

const createCompanies = async () => {
  const prismaClient = new PrismaClient()

  const companies = await createCompaniesData()

  for (const company of companies) {
    const createdCompany = await prismaClient.company.create({ data: {...company} })
    companiesIds.push(createdCompany.id)
  }

  console.log('Companies created')
}

const createIngredients = async () => {
  const prismaClient = new PrismaClient()

  for (const ingredient of baseIngredients) {
    await prismaClient.ingredient.create({ data: ingredient })
  }

  for (const ingredient of fillingIngredients) {
    await prismaClient.ingredient.create({ data: ingredient })
  }

  for (const ingredient of frostingIngredients) {
    await prismaClient.ingredient.create({ data: ingredient })
  }

  for (const ingredient of extraIngredients) {
    await prismaClient.ingredient.create({ data: ingredient })
  }

  console.log('Ingredients created')
}

function getRandomIntInclusive(min: number, max: number): number {
  const safeMin = Math.ceil(min)
  const safeMax = Math.floor(max)
  return Math.floor(Math.random() * (safeMax - safeMin + 1) + safeMin)
}

const createIngredientPrices = (type: string) => {
  const typeMultiplier = {
    base: 500,
    filling: 300,
    frosting: 200,
    extra: 100
  } as Record<string, number>

  const multiplier = typeMultiplier[type] || 2

  const price = getRandomIntInclusive(3, 5) * multiplier

  return {s: price * 0.75, m: price, l: price * 1.5}
}

const assignPrices = async () => {
  const prismaClient = new PrismaClient()

  const allIngredients = await prismaClient.ingredient.findMany()

  for (const companyId of companiesIds) {
    for (const ingredient of allIngredients) {
      const {s, m, l} = createIngredientPrices(ingredient.category)

      await prismaClient.companiesIngredients.create({ data: {
        fk_id_company: companyId,
        fk_id_ingredient: ingredient.id,
        is_available: true,
        price_s: s,
        price_m: m,
        price_l: l
      }})
    }

    console.log(`Prices assigned to company: ${companyId}`)
  }

  console.log('All Prices assigned')
}





const run = async () => {
  const [ env = 'develop' ] = process.argv.slice(2);

  console.log(`Starting seed script for ${env} environment`)

  await resetDatabase()
  await createCompanies()
  await createIngredients()
  await assignPrices()
}

run()
