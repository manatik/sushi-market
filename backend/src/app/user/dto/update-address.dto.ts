import { IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  comment?: string;
}
