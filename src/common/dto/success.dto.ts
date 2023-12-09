import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse {
  @ApiProperty({
    description: 'Indicates whether the operation was successful',
    example: true,
    type: Boolean,
  })
  success: boolean;
}
