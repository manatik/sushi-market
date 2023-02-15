import { TypePromotion } from '@promotion/entity/promotion.entity';
import { IsBoolean, IsDateString, IsEnum, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdatePromotionDto {
  @IsOptional()
  @IsString()
  article?: string;

  @IsOptional()
  @IsNumber()
  @Max(100)
  @Min(0)
  discount?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  promocode?: string;

  @IsOptional()
  @IsBoolean()
  hidden?: boolean;

  @IsOptional()
  @IsBoolean()
  isDisposable?: boolean;

  @IsOptional()
  @IsEnum(TypePromotion)
  typePromotion?: TypePromotion;

  @IsOptional()
  @IsNumber()
  @Min(1)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  oldPrice?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  dateStart: Date;

  @IsOptional()
  @IsDateString()
  dateEnd: Date;
}
