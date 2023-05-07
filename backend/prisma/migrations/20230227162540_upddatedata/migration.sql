/*
  Warnings:

  - You are about to drop the `VirtualDevice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "devices" DROP CONSTRAINT "devices_virtualDeviceId_fkey";

-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "tenant_id" INTEGER;

-- DropTable
DROP TABLE "VirtualDevice";

-- CreateTable
CREATE TABLE "virtual_devices" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" INTEGER,

    CONSTRAINT "virtual_devices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "virtual_devices_tenant_id_index" ON "virtual_devices"("tenant_id");

-- CreateIndex
CREATE INDEX "groups_tenant_id_index" ON "groups"("tenant_id");

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_virtualDeviceId_fkey" FOREIGN KEY ("virtualDeviceId") REFERENCES "virtual_devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
