import { TypePromotion } from '@promotion/entity/promotion.entity';
import { isTrue } from '@utils/utils';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class GetAllQuery {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => isTrue(value))
  onlyHidden?: boolean;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (!value ? undefined : value))
  name?: string;

  @IsOptional()
  @IsEnum(TypePromotion)
  @Transform(({ value }) => (!value ? undefined : value))
  promotionType?: TypePromotion;
}
