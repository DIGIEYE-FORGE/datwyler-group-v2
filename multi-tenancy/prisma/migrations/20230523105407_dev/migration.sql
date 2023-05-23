-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "tenant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parent_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "tenantId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tenant" ADD CONSTRAINT "tenant_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
