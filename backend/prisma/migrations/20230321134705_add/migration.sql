/*
  Warnings:

  - A unique constraint covering the columns `[credentialId]` on the table `devices` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "devices_credentialId_key" ON "devices"("credentialId");
