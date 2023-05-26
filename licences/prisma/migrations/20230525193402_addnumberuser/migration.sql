-- AlterTable
ALTER TABLE "License" ADD COLUMN     "number_of_data_centers" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "number_of_users" INTEGER NOT NULL DEFAULT 0;
