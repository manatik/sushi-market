import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RemoveProductPhotoQuery {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  photoId: string;
}
