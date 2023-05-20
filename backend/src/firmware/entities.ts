/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsString,
  MinLength,
  MaxLength,
  IsDateString,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { IsPassword, IsPhoneNumber } from 'src/utils';

export class Firmware {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: false })
  version: string;
  @ApiProperty({ required: false })
  url: string;
  @ApiProperty({ required: false })
  size: number;
  @ApiProperty({ required: false })
  hash: string;
  @ApiProperty({ required: false })
  createdAt: Date;
  @ApiProperty({ required: false })
  updatedAt: Date;
}

export class CreateFirmwareWithOutUrlDto {
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  version: string;
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  hash: string;
}

export class CreateFirmwareDto {
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
  description?: string;
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  version: string;
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  url: string;
  @ApiProperty({ required: true })
  @IsInt()
  size: number;
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  hash: string;
  
  @ApiProperty({ required: false })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  tenantId: number;
}

export class UploadedFilesDto {
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  url: string;
}

export class UpdateFirmwareDto {
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
  version: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  description?: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  url: string;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  size: number;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  hash: string;
}
