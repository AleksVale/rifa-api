import { Body, Controller, Post } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestResponse } from 'src/common/dto/bad-request.dto';
import { SuccessResponse } from 'src/common/dto/success.dto';
import { CreatePromotionDto } from './dto/create-promotion.dto';

@ApiTags('Promotion')
@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: SuccessResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestResponse,
  })
  async update(
    @Body() updatePromotionDto: CreatePromotionDto[],
  ): Promise<SuccessResponse> {
    await this.promotionService.upsertAll(updatePromotionDto);
    return { success: true };
  }
}
