import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateIngredientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
