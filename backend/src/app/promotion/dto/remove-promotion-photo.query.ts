import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RemovePromotionPhotoQuery {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  photoId: string;
}
