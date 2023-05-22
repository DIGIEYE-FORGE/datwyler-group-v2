
ALTER TABLE "history" DROP COLUMN "alias",
DROP COLUMN "color",
DROP COLUMN "icon",
DROP COLUMN "show",
DROP COLUMN "value",
ADD COLUMN     "value" JSON NOT NULL;

-- AlterTable
ALTER TABLE "last_telemetry" DROP COLUMN "value",
ADD COLUMN     "value" JSON NOT NULL;
