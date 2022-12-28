import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateSubCategoryDto {
  @IsOptional()
  @IsString()
  article?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @IsUUID('4')
  categoryId?: string;

  @IsOptional()
  @IsNumber()
  orderBy?: number;

  @IsOptional()
  @IsBoolean()
  hidden?: boolean;

  @IsOptional()
  @IsDateString()
  dateDeleted?: Date;
}
