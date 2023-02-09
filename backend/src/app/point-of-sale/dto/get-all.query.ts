import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class GetAllQuery {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (!value ? undefined : value))
  address?: string;
}
