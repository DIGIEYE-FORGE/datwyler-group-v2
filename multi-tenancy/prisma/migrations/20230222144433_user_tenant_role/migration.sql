/*
  Warnings:

  - You are about to drop the `_TenantToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TenantToUser" DROP CONSTRAINT "_TenantToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TenantToUser" DROP CONSTRAINT "_TenantToUser_B_fkey";

-- DropTable
DROP TABLE "_TenantToUser";

-- CreateTable
CREATE TABLE "user_tenant" (
    "user_id" INTEGER NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_tenant_pkey" PRIMARY KEY ("user_id","tenant_id")
);

-- AddForeignKey
ALTER TABLE "user_tenant" ADD CONSTRAINT "user_tenant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_tenant" ADD CONSTRAINT "user_tenant_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
