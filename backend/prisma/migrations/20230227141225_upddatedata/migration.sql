/*
  Warnings:

  - You are about to drop the column `acknowledged_by_id` on the `alert` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `credentials` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "alert" DROP CONSTRAINT "alert_acknowledged_by_id_fkey";

-- DropForeignKey
ALTER TABLE "credentials" DROP CONSTRAINT "credentials_user_id_fkey";

-- AlterTable
ALTER TABLE "alert" DROP COLUMN "acknowledged_by_id";

-- AlterTable
ALTER TABLE "credentials" DROP COLUMN "user_id";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "Role";
