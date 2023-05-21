-- DropForeignKey
ALTER TABLE "alert" DROP CONSTRAINT "alert_deviceId_fkey";

-- AddForeignKey
ALTER TABLE "alert" ADD CONSTRAINT "alert_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
