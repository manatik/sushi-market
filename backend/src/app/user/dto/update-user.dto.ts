import { Transform } from 'class-transformer';
import { IsDateString, IsOptional, IsPhoneNumber, IsString, } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsPhoneNumber('RU')
  phone: string;

  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (!value ? undefined : value))
  lastname: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (!value ? undefined : value))
  @IsDateString()
  birthdate: Date;

  @IsOptional()
  @IsString({ each: true })
  roles: string[];
}
