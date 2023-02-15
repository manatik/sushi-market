import { IsNotEmpty, IsString } from 'class-validator';

export class AddProductsDto {
  @IsNotEmpty()
  @IsString({ each: true })
  products: string[];
}
