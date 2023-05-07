/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { TypeCredential } from '@prisma/client';
import {
  IsInt,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { IsPassword, IsPhoneNumber } from 'src/utils';

export class Credential {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: false })
  username: string;
  @ApiProperty({ required: false })
  password: string;
  @ApiProperty({ required: false })
  token: string;
  @ApiProperty({ required: false })
  certificat: string;
  @ApiProperty({ required: false })
  clientId: number;
  @ApiProperty({ required: false })
  createdAt: Date;
  @ApiProperty({ required: false })
  updatedAt: Date;
  @ApiProperty({ required: false })
  type: TypeCredential;
}

export class CreateCredentialDto {
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
  password: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  token: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  certificat: string;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  clientId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(['TOKEN', 'CERTIFICATE', 'USERPASSWORD'])
  type: TypeCredential;
}

export class UpdateCredentialDto {
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
  password: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  token: string;
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  certificat: string;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  clientId: number;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(['TOKEN', 'CERTIFICATE', 'USERPASSWORD'])
  type: TypeCredential;
}
