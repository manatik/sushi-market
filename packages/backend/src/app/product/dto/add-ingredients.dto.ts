import { IsNotEmpty, IsString } from 'class-validator';

export class AddIngredientsDto {
  @IsNotEmpty()
  @IsString({ each: true })
  ingredients: string[];
}
