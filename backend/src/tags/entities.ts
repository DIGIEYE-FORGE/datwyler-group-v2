/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  isNumber,
  isInt,
} from 'class-validator';
import { IsPassword, IsPhoneNumber } from 'src/utils';

export class Tage {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: false })
  createdAt: Date;
  @ApiProperty({ required: false })
  updatedAt: Date;
}

export class CreateTageDto {
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;
}

export class UpdateTageDto {
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @IsOptional()
  @MaxLength(50)
  name: string;
}
