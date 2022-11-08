import { RoleEntity } from '@role/entity/role.entity';

export type User = {
  id: string;
  roles: RoleEntity[];
};
