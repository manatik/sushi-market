import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdatePointOfSaleDto {
  @IsOptional()
  @IsString()
  addressPointSale?: string;

  @IsOptional()
  @IsString()
  fpApiCode?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  operatingModePointSale?: string;

  @IsOptional()
  @IsString()
  operatingModeDelivery?: string;

  @IsOptional()
  @IsDateString()
  dateDeleted?: Date;
}
