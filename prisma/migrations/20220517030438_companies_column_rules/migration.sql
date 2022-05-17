/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `companies` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "companies" ALTER COLUMN "logo" DROP NOT NULL,
ALTER COLUMN "primary_color" DROP NOT NULL,
ALTER COLUMN "secondary_color" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "companies_url_key" ON "companies"("url");
