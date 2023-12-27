// update-raffle.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  IsDateString,
  IsArray,
  IsBoolean,
} from 'class-validator';

class PrizeDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  place?: number;
}

class PromotionDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  quantity?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  price?: number;
}

export class UpdateRaffleDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  TimeToPay?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsDateString()
  drawingDate?: string;

  @ApiProperty({ required: false })
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  minTickets?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  maxTickets?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  showRanking?: boolean;

  @ApiProperty({ required: false, type: [PrizeDto] })
  @IsOptional()
  @IsArray()
  prizes?: PrizeDto[];

  @ApiProperty({ required: false, type: [PromotionDto] })
  @IsOptional()
  @IsArray()
  promotions?: PromotionDto[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  deletedImages?: string[];
}
