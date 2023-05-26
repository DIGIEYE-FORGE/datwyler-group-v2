-- CreateTable
CREATE TABLE "pack" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "number_of_users" INTEGER NOT NULL DEFAULT 0,
    "number_of_data_centers" INTEGER NOT NULL DEFAULT 0,
    "expired_at" TIMESTAMP(3),
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "pack_pkey" PRIMARY KEY ("id")
);
