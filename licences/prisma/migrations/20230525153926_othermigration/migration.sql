/*
  Warnings:

  - You are about to drop the column `parent_id` on the `License` table. All the data in the column will be lost.
  - Added the required column `number_admin` to the `License` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_data_center` to the `License` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_user` to the `License` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "License" DROP COLUMN "parent_id",
ADD COLUMN     "admins" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
ADD COLUMN     "number_admin" INTEGER NOT NULL,
ADD COLUMN     "number_data_center" INTEGER NOT NULL,
ADD COLUMN     "number_user" INTEGER NOT NULL;
