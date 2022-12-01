import { IsNotEmpty, IsUUID } from 'class-validator';

export class SetActiveAddressDto {
  @IsNotEmpty()
  @IsUUID('4')
  id: string;
}
