import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveProductQuery {
  @IsNotEmpty()
  @IsString()
  productId: string;
}
