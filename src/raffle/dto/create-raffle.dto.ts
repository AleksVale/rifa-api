import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateRaffleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ minimum: 1 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  ticketLimit: number;
}
