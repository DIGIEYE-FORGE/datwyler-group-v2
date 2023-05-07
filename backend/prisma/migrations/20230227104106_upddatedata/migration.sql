-- AlterTable
ALTER TABLE "devices" ADD COLUMN     "tenant_id" INTEGER;

-- CreateIndex
CREATE INDEX "tenant_id" ON "devices"("tenant_id");
