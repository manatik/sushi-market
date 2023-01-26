import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateDistrictDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID('4')
  pointSaleId?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  minSumOrder: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  priceDelivery: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  priceFreeDelivery: number;

  @IsOptional()
  @IsDateString()
  dateDeleted?: Date;
}
