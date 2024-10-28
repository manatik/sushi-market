import { IsNotEmpty, IsString } from 'class-validator';

export class AddRolesDto {
  @IsNotEmpty()
  @IsString({ each: true })
  roles: string[];
}
