-- CreateEnum
CREATE TYPE "TypeCredential" AS ENUM ('TOKEN', 'CERTIFICATE', 'USERPASSWORD');

-- CreateTable
CREATE TABLE "virtual_devices" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" INTEGER,

    CONSTRAINT "virtual_devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "type" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "parent_id" INTEGER,
    "location" VARCHAR(50),
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "ip" VARCHAR(50),
    "attributes" JSONB,
    "tenant_id" INTEGER,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alert" (
    "id" SERIAL NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "type" TEXT,
    "message" TEXT,
    "level" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "attributes" JSON NOT NULL DEFAULT '{}',
    "acknowledged_by" INTEGER,

    CONSTRAINT "alert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "decoders" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "fnc" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenant_id" INTEGER,

    CONSTRAINT "decoders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" INTEGER,

    CONSTRAINT "device_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "firmwares" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "version" VARCHAR(100),
    "description" VARCHAR(255),
    "url" TEXT,
    "size" INTEGER,
    "hash" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" INTEGER,

    CONSTRAINT "firmwares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "protocols" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" INTEGER,

    CONSTRAINT "protocols_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_profiles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),
    "logo" VARCHAR(255),
    "cridentials_type" "TypeCredential",
    "device_type_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "protocolId" INTEGER,
    "decoderId" INTEGER,
    "attributes" JSON,
    "tenant_id" INTEGER,

    CONSTRAINT "device_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credentials" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "token" TEXT,
    "certificate" TEXT,
    "type" "TypeCredential" NOT NULL DEFAULT 'USERPASSWORD',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vmq_auth_acl" (
    "id" SERIAL NOT NULL,
    "mountpoint" VARCHAR(10) NOT NULL DEFAULT '',
    "username" VARCHAR(128) NOT NULL,
    "client_id" VARCHAR(128) NOT NULL,
    "password" VARCHAR(128),
    "publish_acl" JSONB NOT NULL,
    "subscribe_acl" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vmq_auth_acl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "devices" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),
    "serial" VARCHAR(100) NOT NULL,
    "is_passive" BOOLEAN NOT NULL DEFAULT false,
    "is_online" BOOLEAN NOT NULL DEFAULT false,
    "is_decoder" BOOLEAN NOT NULL DEFAULT false,
    "credentialId" INTEGER,
    "configuration" VARCHAR(250),
    "deviceProfileId" INTEGER,
    "firmwareId" INTEGER,
    "ip" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "virtualDeviceId" INTEGER,
    "groupId" INTEGER,
    "tenant_id" INTEGER,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attributes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "device_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "last_telemetry" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "value" JSON NOT NULL,
    "alias" VARCHAR(100),
    "icon" VARCHAR(40),
    "color" VARCHAR(30),
    "show" BOOLEAN NOT NULL DEFAULT true,
    "device_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "last_telemetry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "query" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "value" JSON NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deviceId" INTEGER NOT NULL,

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DeviceToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "virtual_devices_tenant_id_index" ON "virtual_devices"("tenant_id");

-- CreateIndex
CREATE INDEX "groups_tenant_id_index" ON "groups"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "groups_name_tenant_id_parent_id_key" ON "groups"("name", "tenant_id", "parent_id");

-- CreateIndex
CREATE UNIQUE INDEX "decoders_name_tenant_id_key" ON "decoders"("name", "tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "device_types_name_tenant_id_key" ON "device_types"("name", "tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "firmwares_url_key" ON "firmwares"("url");

-- CreateIndex
CREATE UNIQUE INDEX "firmwares_name_version_tenant_id_key" ON "firmwares"("name", "version", "tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "protocols_name_tenant_id_key" ON "protocols"("name", "tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "device_profiles_name_tenant_id_key" ON "device_profiles"("name", "tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "credentials_username_key" ON "credentials"("username");

-- CreateIndex
CREATE UNIQUE INDEX "credentials_token_key" ON "credentials"("token");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "vmq_auth_acl_mountpoint_username_client_id_key" ON "vmq_auth_acl"("mountpoint", "username", "client_id");

-- CreateIndex
CREATE UNIQUE INDEX "devices_serial_key" ON "devices"("serial");

-- CreateIndex
CREATE UNIQUE INDEX "devices_credentialId_key" ON "devices"("credentialId");

-- CreateIndex
CREATE INDEX "tenant_id" ON "devices"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "attributes_device_id_name_key" ON "attributes"("device_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "last_telemetry_device_id_name_key" ON "last_telemetry"("device_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "reports_tenant_id_name_key" ON "reports"("tenant_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "_DeviceToTag_AB_unique" ON "_DeviceToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_DeviceToTag_B_index" ON "_DeviceToTag"("B");

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alert" ADD CONSTRAINT "alert_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device_profiles" ADD CONSTRAINT "device_profiles_device_type_id_fkey" FOREIGN KEY ("device_type_id") REFERENCES "device_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device_profiles" ADD CONSTRAINT "device_profiles_protocolId_fkey" FOREIGN KEY ("protocolId") REFERENCES "protocols"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device_profiles" ADD CONSTRAINT "device_profiles_decoderId_fkey" FOREIGN KEY ("decoderId") REFERENCES "decoders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "credentials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_deviceProfileId_fkey" FOREIGN KEY ("deviceProfileId") REFERENCES "device_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_firmwareId_fkey" FOREIGN KEY ("firmwareId") REFERENCES "firmwares"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_virtualDeviceId_fkey" FOREIGN KEY ("virtualDeviceId") REFERENCES "virtual_devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attributes" ADD CONSTRAINT "attributes_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "last_telemetry" ADD CONSTRAINT "last_telemetry_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToTag" ADD CONSTRAINT "_DeviceToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToTag" ADD CONSTRAINT "_DeviceToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
