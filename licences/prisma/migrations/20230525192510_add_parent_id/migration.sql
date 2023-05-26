/*
  Warnings:

  - You are about to drop the column `admins` on the `License` table. All the data in the column will be lost.
  - You are about to drop the column `number_admin` on the `License` table. All the data in the column will be lost.
  - You are about to drop the column `number_data_center` on the `License` table. All the data in the column will be lost.
  - You are about to drop the column `number_user` on the `License` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "License" DROP COLUMN "admins",
DROP COLUMN "number_admin",
DROP COLUMN "number_data_center",
DROP COLUMN "number_user",
ADD COLUMN     "name" TEXT,
ADD COLUMN     "parent_id" INTEGER;
