import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('RU')
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 15)
  password: string;
}
