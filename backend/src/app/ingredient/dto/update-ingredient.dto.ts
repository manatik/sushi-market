import { IsOptional, IsString } from 'class-validator';

export class UpdateIngredientDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
