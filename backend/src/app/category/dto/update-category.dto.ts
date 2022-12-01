import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  article: string;

  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsBoolean()
  hidden?: boolean;

  @IsOptional()
  @IsNumber()
  orderBy: number;
}
