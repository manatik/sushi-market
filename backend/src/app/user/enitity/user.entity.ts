import { BeforeInsert, Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Base } from '@typeorm/Base';
import * as bcrypt from 'bcrypt';
import { RoleEntity } from '@role/entity/role.entity';
import { AddressEntity } from '@user/enitity/address.entity';

@Entity('user')
export class UserEntity extends Base {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  phone: string;

  @Column({ name: 'active_address_id' })
  activeAddressId: string;

  @Column()
  birthdate: Date;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @DeleteDateColumn({ name: 'date_deleted' })
  dateDeleted: Date;

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: RoleEntity[];

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses: AddressEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
