import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePrizeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  place: number;

  @IsNotEmpty()
  @IsNumber()
  raffleID: number;
  // Add other necessary fields, such as price, if needed
}
