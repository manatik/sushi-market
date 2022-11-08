import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('RU')
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 15)
  password: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsDateString()
  birthdate: Date;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;
}
