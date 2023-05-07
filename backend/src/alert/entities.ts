/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString, IsOptional } from 'class-validator';
import { IsPassword, IsPhoneNumber } from 'src/utils';

export class Alert {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: false })
  deviceId: number;
  @ApiProperty({ required: false })
  acknowledgedById: number;
  @ApiProperty({ required: false })
  createdAt: Date;
  @ApiProperty({ required: false })
  updatedAt: Date;
}

export class CreateAlertDto {
  @ApiProperty({ required: true })
  @IsInt()
  deviceId: number;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  acknowledgedById: number;
}

export class UpdateAlertDto {
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  deviceId: number;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  acknowledgedById: number;
}
