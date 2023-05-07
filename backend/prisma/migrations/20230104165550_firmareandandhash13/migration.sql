/*
  Warnings:

  - You are about to alter the column `version` on the `firmwares` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "firmwares" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "version" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "hash" SET DATA TYPE VARCHAR(100);
