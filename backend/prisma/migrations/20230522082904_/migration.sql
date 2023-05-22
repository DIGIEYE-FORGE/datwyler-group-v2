/*
  Warnings:

  - You are about to drop the column `alias` on the `history` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `history` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `history` table. All the data in the column will be lost.
  - You are about to drop the column `show` on the `history` table. All the data in the column will be lost.
  - Changed the type of `value` on the `history` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `value` on the `last_telemetry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "history" DROP COLUMN "alias",
DROP COLUMN "color",
DROP COLUMN "icon",
DROP COLUMN "show",
DROP COLUMN "value",
ADD COLUMN     "value" JSON NOT NULL;

-- AlterTable
ALTER TABLE "last_telemetry" DROP COLUMN "value",
ADD COLUMN     "value" JSON NOT NULL;
