import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveIngredientQuery {
  @IsNotEmpty()
  @IsString()
  ingredientId: string;
}
