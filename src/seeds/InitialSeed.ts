import { PrismaClient } from '@prisma/client'
import { resetDatabase } from "./resetDatabase"

const companies = [
  {
    name: "Bolos do João",
    email: "joão@mail.com",
    password: "1234",
    logo: "http://localhost:3333/images/866fa8bbdb2e495d98cad65a36ee3491.png",
    phone: "5516996381316",
    primary_color: "#ff9000",
    secondary_color: "#AA2055",
    url: "localhost:3000",
  }
]

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
    name: "Leite condençado",
    description: "Recheio creme de leite condençado",
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

  for (const company of companies) {
    const createdCompany = await prismaClient.company.create({ data: company })
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
  }

  console.log('Prices assigned')
}


const run = async () => {
  await resetDatabase()
  await createCompanies()
  await createIngredients()
  await assignPrices()
}

run()
