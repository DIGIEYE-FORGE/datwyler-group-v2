/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  MinLength,
  MaxLength,
  IsDateString,
  IsOptional,
  IsObject,
  IsArray,
} from 'class-validator';
import { IsPassword, IsPhoneNumber } from 'src/utils';

export class VmqAuthAcl {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: false })
  mountpoint: string;
  @ApiProperty({ required: false })
  username: string;
  @ApiProperty({ required: false })
  clientId: string;
  @ApiProperty({ required: false })
  password: string;
  @ApiProperty({ required: false })
  createdAt: Date;
  @ApiProperty({ required: false })
  updatedAt: Date;
}

export class CreateVmqAuthAclDto {
  @ApiProperty({ required: true })
  @MaxLength(255)
  mountpoint: string;
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  username: string;
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  clientId: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  password: string;

  @IsArray()
  publishAcl: Attributes[];
  @IsArray()
  subscribeAcl: Attributes[];
}

interface Attributes {
  [key: string]: string | number | boolean | Attributes | Attributes[];
}

export class UpdateVmqAuthAclDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  mountpoint: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  username: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  clientId: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  password: string;

  @IsArray()
  publishAcl: Attributes[];

  @IsArray()
  subscribeAcl: Attributes[];
}
