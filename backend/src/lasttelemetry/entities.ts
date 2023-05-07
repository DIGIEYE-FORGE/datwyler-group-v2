/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  MinLength,
  MaxLength,
  IsDateString,
  IsOptional,
  Matches,
  IsBoolean,
} from 'class-validator';
import { IsPassword, IsPhoneNumber } from 'src/utils';

export class LastTelemetry {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: false })
  value: string;
  @ApiProperty({ required: false })
  deviceId: number;
  @ApiProperty({ required: false })
  createdAt: Date;
  @ApiProperty({ required: false })
  updatedAt: Date;
  @ApiProperty({ required: false })
  color: string;
  @ApiProperty({ required: false })
  icon: string;
  @ApiProperty({ required: false })
  alias: string;
}

export class CreateLastTelemetryDto {
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  value: string;
  @ApiProperty({ required: true })
  @IsInt()
  deviceId: number;

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
  @IsString()
  @MinLength(2)
  @MaxLength(40)
  @IsOptional()
  alias: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  show: boolean;
}

export class UpdateLastTelemetryDto {
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  name: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  value: string;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  deviceId: number;
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
  @IsString()
  @MinLength(2)
  @MaxLength(40)
  @IsOptional()
  alias: string;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  show: boolean;
}
