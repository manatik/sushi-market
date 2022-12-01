import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  article: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

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
}
