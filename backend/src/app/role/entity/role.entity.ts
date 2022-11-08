import { Column, DeleteDateColumn, Entity, ManyToMany } from 'typeorm';
import { Base } from '@typeorm/Base';
import { UserEntity } from '@user/enitity/user.entity';

@Entity('role')
export class RoleEntity extends Base {
  @Column()
  name: string;

  @DeleteDateColumn({ name: 'date_deleted' })
  dateDeleted: Date;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
