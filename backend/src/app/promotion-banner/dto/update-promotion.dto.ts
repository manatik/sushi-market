import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePromotionDto {
  @IsNotEmpty()
  @IsNumber()
  orderBy: number;
}
