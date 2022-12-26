import { TypePromotion } from '@promotion/entity/promotion.entity';
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreatePromotionDto {
  @IsNotEmpty()
  @IsString()
  article: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(TypePromotion)
  typePromotion: TypePromotion;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  oldPrice: number;

  @IsNotEmpty()
  @IsDate()
  dateStart: Date;

  @IsNotEmpty()
  @IsDate()
  dateEnd: Date;

  @IsOptional()
  @IsBoolean()
  hidden?: boolean;

  @IsOptional()
  @IsNumber()
  @Max(100)
  @Min(0)
  discount?: number;

  @IsOptional()
  @IsString()
  promocode?: string;

  @IsOptional()
  @IsBoolean()
  isDisposable: boolean;

  @IsOptional()
  @IsString()
  description?: string;
}
