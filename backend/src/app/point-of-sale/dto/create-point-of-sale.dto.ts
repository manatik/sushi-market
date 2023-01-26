import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePointOfSaleDto {
  @IsNotEmpty()
  @IsString()
  addressPointSale: string;

  @IsOptional()
  @IsString()
  fpApiCode?: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  operatingModePointSale: string;

  @IsNotEmpty()
  @IsString()
  operatingModeDelivery: string;

  @IsOptional()
  @IsDateString()
  dateDeleted?: Date;
}
