import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSubCategoryDto {
  @IsNotEmpty()
  @IsString()
  article: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  categoryId: string;

  @IsOptional()
  @IsNumber()
  orderBy?: number;

  @IsOptional()
  @IsBoolean()
  hidden?: boolean;
}
