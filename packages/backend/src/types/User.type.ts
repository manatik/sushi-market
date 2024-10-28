import { RoleEntity } from '@role/entity/role.entity';

export type User<T = unknown> = T & {
  id: string;
  roles: RoleEntity[];
};
