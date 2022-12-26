import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  article?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  hidden?: boolean;

  @IsOptional()
  @IsNumber()
  orderBy?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  price?: number;

  @IsOptional()
  @IsString()
  calories?: string;

  @IsOptional()
  @IsString()
  proteins?: string;

  @IsOptional()
  @IsString()
  fats?: string;

  @IsOptional()
  @IsString()
  carbohydrates?: string;

  @IsOptional()
  @IsString()
  weight?: string;

  @IsOptional()
  @IsDate()
  dateDeleted?: Date;
}
