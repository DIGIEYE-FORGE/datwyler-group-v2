/*
  Warnings:

  - You are about to drop the column `acknowledged` on the `alert` table. All the data in the column will be lost.
  - You are about to drop the column `device_name` on the `alert` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `alert` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `alert` table. All the data in the column will be lost.
  - You are about to drop the column `meaning` on the `alert` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `alert` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `alert` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `alert` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `decoders` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `decoders` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `alert` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "alert" DROP COLUMN "acknowledged",
DROP COLUMN "device_name",
DROP COLUMN "end_time",
DROP COLUMN "level",
DROP COLUMN "meaning",
DROP COLUMN "name",
DROP COLUMN "start_time",
DROP COLUMN "type",
ADD COLUMN     "attributes" JSON NOT NULL DEFAULT '{}',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "decoders" DROP COLUMN "created_at",
DROP COLUMN "updated_at";
