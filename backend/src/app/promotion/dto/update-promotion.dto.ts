import { TypePromotion } from '@promotion/entity/promotion.entity';
import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdatePromotionDto {
  @IsOptional()
  @IsString()
  article: string;

  @IsOptional()
  @IsNumber()
  @Max(100)
  @Min(0)
  discount?: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  promocode?: string;

  @IsOptional()
  @IsBoolean()
  isDisposable: boolean;

  @IsOptional()
  @IsEnum(TypePromotion)
  typePromotion: TypePromotion;

  @IsOptional()
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  dateStart: Date;

  @IsOptional()
  @IsDate()
  dateEnd: Date;
}
