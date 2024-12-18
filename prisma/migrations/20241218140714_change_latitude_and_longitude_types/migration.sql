/*
  Warnings:

  - Changed the type of `latitude` on the `organizations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `longitude` on the `organizations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "latitude",
ADD COLUMN     "latitude" DECIMAL(65,30) NOT NULL,
DROP COLUMN "longitude",
ADD COLUMN     "longitude" DECIMAL(65,30) NOT NULL;
