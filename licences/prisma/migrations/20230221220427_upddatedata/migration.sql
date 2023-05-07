-- CreateTable
CREATE TABLE "License" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired_at" TIMESTAMP(3),
    "number_user" INTEGER NOT NULL DEFAULT 0,
    "number_admin" INTEGER NOT NULL DEFAULT 0,
    "number_data_center" INTEGER NOT NULL DEFAULT 0,
    "users" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "data_centers" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "admins" INTEGER[] DEFAULT ARRAY[]::INTEGER[],

    CONSTRAINT "License_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "License_tenant_id_idx" ON "License"("tenant_id");
