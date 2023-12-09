import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponse {
  @ApiProperty({
    description: 'Array of error messages',
    example: [
      'name must be a string',
      'name should not be empty',
      'ticketLimit must not be less than 1',
      'ticketLimit must be an integer number',
      'ticketLimit should not be empty',
    ],
    type: [String],
  })
  message: string[];

  @ApiProperty({
    description: 'Error type',
    example: 'Bad Request',
    type: String,
  })
  error: string;

  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
    type: Number,
  })
  statusCode: number;
}
