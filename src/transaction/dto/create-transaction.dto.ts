import { ApiProperty } from '@nestjs/swagger';

class Data {
  @ApiProperty()
  id: number;
}

export class CreateTransactionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  live_mode: boolean;

  @ApiProperty()
  type: string;

  @ApiProperty({ name: 'date_created' })
  dateCreated: string;

  @ApiProperty({ name: 'user_id' })
  userId: number;

  @ApiProperty({ name: 'api_version' })
  apiVersion: string;

  @ApiProperty()
  action: string;

  @ApiProperty({ type: Data })
  data: Data;
}
