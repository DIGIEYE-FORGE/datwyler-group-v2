/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsArray,
  IsObject,
  IsBoolean,
  IsNumberString,
  IsNumber,
  IsBooleanString,
  isNumberString,
  Matches,
} from 'class-validator';

interface credentialInterface {
  username?: string;
  password?: string;
  token?: string;
  certificat?: string;
  clientId?: number;
  type?: 'TOKEN' | 'CERTIFICATE' | 'USERPASSWORD';
}

export class Device {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: false })
  type: string;
  @ApiProperty({ required: false })
  description: string;
  @ApiProperty({ required: false })
  serial: string;
  @ApiProperty({ required: false })
  decoderId: number;
  @ApiProperty({ required: false })
  deviceProfileId: number;
  @ApiProperty({ required: false })
  credential: credentialInterface;
  @ApiProperty({ required: false })
  gatewayId: number;
  @ApiProperty({ required: false })
  deviceTypeId: number;
  @ApiProperty({ required: false })
  firmwareId: number;
  @ApiProperty({ required: false })
  configuration: number;
  @ApiProperty({ required: false })
  @IsBoolean()
  isdecoded: boolean;
  @ApiProperty({ required: false })
  ip: string;
}

export class CreateDeviceDto {
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  description: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @IsOptional()
  @MaxLength(255)
  serial: string;
  @ApiProperty({ required: false })
  @IsBooleanString()
  @IsOptional()
  isPassive: boolean;
  @ApiProperty({ required: false })
  @IsBooleanString()
  @IsOptional()
  isOnline: boolean;
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  configuration: string;
  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  deviceProfileId: number;
  @ApiProperty({ required: false })
  credential: credentialInterface;
  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  firmwareId: number;
  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  groupId: number;
  @ApiProperty({ required: false })
  @IsBooleanString()
  @IsOptional()
  isdecoded: boolean;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  decoderId: number;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  ip: string;
  @ApiProperty({ required: false })
  tags: string[];
  @ApiProperty({ required: false })
  attributes: AddAttribute[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  tenantId: number;
}

export class UpdateDeviceDto {
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  description: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  serial: string;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  deviceProfileId: number;
  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  credentialId: number;
  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  firmwareId: number;
  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  decoderId: number;
  @ApiProperty({ required: false })
  @IsBooleanString()
  @IsOptional()
  isdecoded: boolean;
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  configuration: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  ip: string;
  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  groupId: number;
}

export class AddGroupsDto {
  @ApiProperty({ required: true, type: [Number] })
  groups: number[];
}

class AddAttribute {
  @ApiProperty({ required: true })
  @IsString()
  name: string;
  @ApiProperty({ required: true })
  @IsString()
  value: string;
}
class AddLastTelemetry {
  @ApiProperty({ required: true })
  @IsString()
  name: string;
  @ApiProperty({ required: true })
  @IsString()
  value: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  alias: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  @Matches(/^#[A-Fa-f0-9]{6}$/)
  color: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(40)
  @IsOptional()
  icon: string;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  show: boolean;
}
export class AddAttirbutes {
  @ApiProperty({ required: true, type: [AddAttribute] })
  attributes: AddAttribute[];
}
export class addLastTelemetry {
  @IsArray()
  lastTelemetries: AddLastTelemetry[];
}
