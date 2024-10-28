import { Base } from '@typeorm/Base';
import { UserEntity } from '@user/enitity/user.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('role')
export class RoleEntity extends Base {
  @Column()
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
