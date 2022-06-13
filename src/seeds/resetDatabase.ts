import { PrismaClient } from '@prisma/client'

export const resetDatabase = async () => {
  const prismaClient = new PrismaClient()

  const companiesClient = prismaClient.company
  const ingredientsClient=  prismaClient.ingredient
  const companiesIngredientsClient = prismaClient.companiesIngredients

  await companiesIngredientsClient.deleteMany({})
  await ingredientsClient.deleteMany({})
  await companiesClient.deleteMany({})

  console.log('Database reseted')
}
