/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
// import { Role } from '@prisma/client';
import {
  IsInt,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { IsPassword, IsPhoneNumber } from 'src/utils';

export class User {
  //   @ApiProperty({ required: false })
  //   id: number;
  //   @ApiProperty({ required: false })
  //   firstName: string;
  //   @ApiProperty({ required: false })
  //   lastName: string;
  //   @ApiProperty({ required: false })
  //   email: string;
  //   @ApiProperty({ required: false })
  //   password: string;
  //   @ApiProperty({ required: false })
  //   role: Role;
}

export class Login {
  // @ApiProperty({ required: true })
  // @IsString()
  // @MinLength(2)
  // @MaxLength(255)
  // email: string;
  // @ApiProperty({ required: true })
  // @IsString()
  // @MinLength(2)
  // @MaxLength(255)
  // password: string;
}
export class CreateUserDto {
  // @ApiProperty({ required: true })
  // @IsString()
  // @MinLength(2)
  // @MaxLength(255)
  // firstName: string;
  // @ApiProperty({ required: true })
  // @IsString()
  // @MinLength(2)
  // @MaxLength(255)
  // lastName: string;
  // @ApiProperty({ required: true })
  // @IsString()
  // @MinLength(2)
  // @MaxLength(255)
  // email: string;
  // @ApiProperty({ required: true })
  // @IsString()
  // @MinLength(2)
  // @MaxLength(255)
  // password: string;

  // @ApiProperty({ required: false })
  // @IsString()
  // @MinLength(2)
  // @MaxLength(255)
  // @IsOptional()
  // role: Role;

  // @ApiProperty({ required: true })
  // @IsString()
  // @MinLength(2)
  // @MaxLength(255)
  // @IsOptional()
  // logo?: string;
}

export class UpdateUserDto {
  // @ApiProperty({ required: false })
  // @IsString()
  // @MinLength(2)
  // @MaxLength(255)
  // @IsOptional()
  // firstName: string;
  // @ApiProperty({ required: false })
  // @IsString()
  // @MinLength(2)
  // @MaxLength(255)
  // @IsOptional()
  // lastName: string;
  // @ApiProperty({ required: false })
  // @IsString()
  // @MinLength(2)
  // @MaxLength(255)
  // @IsOptional()
  // email: string;
  // @ApiProperty({ required: false })
  // @IsString()
  // @MinLength(2)
  // @MaxLength(255)
  // @IsOptional()
  // password: string;

  // @ApiProperty({ required: false })
  // @IsString()
  // @MinLength(2)
  // @MaxLength(255)
  // @IsOptional()
  // role: Role;
}
