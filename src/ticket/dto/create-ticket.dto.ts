import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator'; // Certifique-se de importar o enum correto

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
}
