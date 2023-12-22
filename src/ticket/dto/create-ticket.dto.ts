import { ApiProperty } from '@nestjs/swagger';
import { StatusOptions } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  IsEnum,
  IsDate,
} from 'class-validator'; // Certifique-se de importar o enum correto

export class CreateTicketDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  number: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  raffleId: number;

  @ApiProperty()
  @IsEnum(StatusOptions)
  status: StatusOptions;

  @ApiProperty()
  @IsDate()
  expirationDate: Date;
}
