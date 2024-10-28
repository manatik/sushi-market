import { IsDateString, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class UpdateDistrictDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID('4')
  pointSaleId?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minSumOrder?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  priceDelivery?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  priceFreeDelivery?: number;

  @IsOptional()
  @IsDateString()
  dateDeleted?: Date;
}
