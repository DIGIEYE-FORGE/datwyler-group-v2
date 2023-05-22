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

export class Alert {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: false })
  deviceId: number;
  @ApiProperty({ required: false })
  type: string;
  @ApiProperty({ required: false })
  message: string;
  @ApiProperty({ required: false })
  level: string;
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
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  type: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  message: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  level: string;
}

export class UpdateAlertDto {
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  deviceId: number;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  type: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  message: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  level: string;
}
