import { PartialType } from '@nestjs/swagger';
import { CreateWinnerDto } from './create-winner.dto';

export class UpdateWinnerDto extends PartialType(CreateWinnerDto) {}
