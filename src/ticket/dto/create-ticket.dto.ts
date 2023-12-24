import { ApiProperty } from '@nestjs/swagger';
import { StatusOptions } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  IsEnum,
  IsDateString,
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
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  raffleId: number;

  @ApiProperty()
  @IsEnum(StatusOptions)
  status: StatusOptions;

  @ApiProperty()
  @IsDateString()
  expirationDate: Date;
}
