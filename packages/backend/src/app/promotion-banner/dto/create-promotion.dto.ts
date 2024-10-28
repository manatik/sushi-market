import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreatePromotionDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  promotionId: string;

  @IsNotEmpty()
  @IsNumber()
  orderBy: number;
}
