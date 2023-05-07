/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  MinLength,
  MaxLength,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { IsPassword, IsPhoneNumber } from 'src/utils';

export class Attribute {
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
}

export class CreateAttributeDto {
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
  @ApiProperty({ required: false })
  @IsInt()
  deviceId: number;
}

export class UpdateAttributeDto {
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
}
