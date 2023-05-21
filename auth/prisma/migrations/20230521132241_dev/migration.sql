/*
  Warnings:

  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `tenants` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
DROP COLUMN "tenants",
ADD COLUMN     "attributes" JSON;

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "TypeCredential";
