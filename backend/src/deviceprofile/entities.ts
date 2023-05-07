/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { TypeCredential } from '@prisma/client';
import {
  IsInt,
  IsString,
  MinLength,
  IsEnum,
  MaxLength,
  IsOptional,
  IsNumberString,
} from 'class-validator';

export class DeviceProfile {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: false })
  description: string;
  @ApiProperty({ required: false })
  logo: string;
  @ApiProperty({ required: false })
  cridentialsType: string;
  @ApiProperty({ required: false })
  deviceTypeId: number;
  @ApiProperty({ required: false })
  attributes: {
    [key: string]: string | number | boolean;
  };
  @ApiProperty({ required: false })
  createdAt: Date;
  @ApiProperty({ required: false })
  updatedAt: Date;
}

export class CreateDeviceProfileDto {
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  protocolId: number;

  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  decoderId: number;

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
  logo: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsEnum(['TOKEN', 'CERTIFICATE', 'USERPASSWORD'])
  @IsOptional()
  cridentialsType: TypeCredential;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  deviceTypeId: number;
}

export class UpdateDeviceProfileDto {
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
  description: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  logo: string;
  @ApiProperty({ required: false })
  @IsEnum(['TOKEN', 'CERTIFICATE', 'USERPASSWORD'])
  @IsOptional()
  cridentialsType: TypeCredential;

  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  deviceTypeId: number;

  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  protocolId: number;

  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  decoderId: number;
}
