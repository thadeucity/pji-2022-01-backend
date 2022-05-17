/*
  Warnings:

  - Added the required column `price_l` to the `companies_ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_m` to the `companies_ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_s` to the `companies_ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies_ingredients" ADD COLUMN     "price_l" INTEGER NOT NULL,
ADD COLUMN     "price_m" INTEGER NOT NULL,
ADD COLUMN     "price_s" INTEGER NOT NULL;
