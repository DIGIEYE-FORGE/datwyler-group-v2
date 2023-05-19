/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MinLength, MaxLength, IsDateString, IsOptional } from 'class-validator'
import { IsPassword, IsPhoneNumber } from 'src/utils';

export class Group {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: false })
  type: string;
  @ApiProperty({ required: false })
  createdAt: Date;
  @ApiProperty({ required: false })
  updatedAt: Date;
  @ApiProperty({ required: false })
  parentId: number;
  @ApiProperty({ required: false })
  tenantId: number;
}

export class CreateGroupDto {
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  type: string;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  parentId: number;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  tenantId: number;
}

export class UpdateGroupDto {
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
  type: string;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  parentId: number;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  tenantId: number;
}

