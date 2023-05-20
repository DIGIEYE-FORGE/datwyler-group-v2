/*
  Warnings:

  - A unique constraint covering the columns `[name,tenant_id]` on the table `decoders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,tenant_id]` on the table `device_profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,tenant_id]` on the table `device_types` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,version,tenant_id]` on the table `firmwares` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,tenant_id,parent_id]` on the table `groups` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,tenant_id]` on the table `protocols` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "decoders_name_key";

-- DropIndex
DROP INDEX "device_profiles_name_key";

-- DropIndex
DROP INDEX "device_types_name_key";

-- DropIndex
DROP INDEX "firmwares_name_version_key";

-- DropIndex
DROP INDEX "protocols_name_key";

-- AlterTable
ALTER TABLE "alert" ADD COLUMN     "level" TEXT,
ADD COLUMN     "message" TEXT,
ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "device_profiles" ALTER COLUMN "attributes" SET DATA TYPE JSON;

-- CreateIndex
CREATE UNIQUE INDEX "decoders_name_tenant_id_key" ON "decoders"("name", "tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "device_profiles_name_tenant_id_key" ON "device_profiles"("name", "tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "device_types_name_tenant_id_key" ON "device_types"("name", "tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "firmwares_name_version_tenant_id_key" ON "firmwares"("name", "version", "tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "groups_name_tenant_id_parent_id_key" ON "groups"("name", "tenant_id", "parent_id");

-- CreateIndex
CREATE UNIQUE INDEX "protocols_name_tenant_id_key" ON "protocols"("name", "tenant_id");
