import { isTrue } from '@utils/utils';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class GetAllQuery {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => isTrue(value))
  withHidden?: boolean;
}
