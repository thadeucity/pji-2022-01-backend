-- AlterTable
ALTER TABLE "companies_ingredients" ADD COLUMN     "is_available" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "price_l" DROP NOT NULL,
ALTER COLUMN "price_m" DROP NOT NULL,
ALTER COLUMN "price_s" DROP NOT NULL;
