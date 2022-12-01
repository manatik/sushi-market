import { TypePromotion } from '@promotion/entity/promotion.entity';
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreatePromotionDto {
  @IsNotEmpty()
  @IsString()
  article: string;

  @IsOptional()
  @IsNumber()
  @Max(100)
  @Min(0)
  discount?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  promocode?: string;

  @IsOptional()
  @IsBoolean()
  isDisposable: boolean;

  @IsNotEmpty()
  @IsEnum(TypePromotion)
  typePromotion: TypePromotion;

  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsDate()
  dateStart: Date;

  @IsNotEmpty()
  @IsDate()
  dateEnd: Date;
}
