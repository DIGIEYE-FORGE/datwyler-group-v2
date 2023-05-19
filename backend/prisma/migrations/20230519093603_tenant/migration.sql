-- AlterTable
ALTER TABLE "decoders" ADD COLUMN     "tenant_id" INTEGER;

-- AlterTable
ALTER TABLE "device_profiles" ADD COLUMN     "tenant_id" INTEGER;

-- AlterTable
ALTER TABLE "device_types" ADD COLUMN     "tenant_id" INTEGER;

-- AlterTable
ALTER TABLE "firmwares" ADD COLUMN     "tenant_id" INTEGER;

-- AlterTable
ALTER TABLE "protocols" ADD COLUMN     "tenant_id" INTEGER;
