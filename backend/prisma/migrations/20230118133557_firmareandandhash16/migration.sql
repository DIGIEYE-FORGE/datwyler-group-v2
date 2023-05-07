-- AlterTable
ALTER TABLE "firmwares" ADD COLUMN     "description" VARCHAR(255),
ALTER COLUMN "url" DROP NOT NULL,
ALTER COLUMN "size" DROP NOT NULL;
