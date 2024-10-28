import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveRoleQuery {
  @IsNotEmpty()
  @IsString()
  roleId: string;
}
