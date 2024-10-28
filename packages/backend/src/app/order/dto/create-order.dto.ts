import {
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('RU')
  phone: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  orderNumber: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  priceTotal: number;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsDateString()
  dateOrder: Date;

  @IsNotEmpty()
  @IsArray()
  products: any[];

  @IsOptional()
  @IsArray()
  promotions: any[];
}
