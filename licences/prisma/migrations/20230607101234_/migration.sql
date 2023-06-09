/*
  Warnings:

  - A unique constraint covering the columns `[serial_number]` on the table `License` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "License" ADD COLUMN     "serial_number" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "License_serial_number_key" ON "License"("serial_number");
