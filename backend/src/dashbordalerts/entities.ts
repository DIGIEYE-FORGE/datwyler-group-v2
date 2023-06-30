/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { TypeCredential } from '@prisma/client';
import { IsJSON, IsNumber, IsOptional } from 'class-validator';

export type JsonArray = Array<JsonValue>;
export interface JsonObject {
  [x: string]: JsonValue;
}

export declare type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonObject
  | JsonArray;

export class DashbordAlerts {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: true })
  userId: number;
  @ApiProperty({ required: false })
  data: JsonValue;
  @ApiProperty({ required: false })
  tenantId: number;
  @ApiProperty({ required: false })
  createdAt: Date;
  @ApiProperty({ required: false })
  updatedAt: Date;
}
export class CreateDashbordAlertsDto {
  @ApiProperty({ required: true })
  @IsNumber()
  @IsOptional()
  userId: number;
  @ApiProperty({ required: false })
  data: JsonValue;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  tenantId?: number;
}
export class UpdateDashbordAlertsDto extends CreateDashbordAlertsDto {}
