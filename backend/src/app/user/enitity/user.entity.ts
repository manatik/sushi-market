import { OrderEntity } from '@order/entity/order.entity';
import { RoleEntity } from '@role/entity/role.entity';
import { Base } from '@typeorm/Base';
import { AddressEntity } from '@user/enitity/address.entity';
import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

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

  @ManyToMany(() => RoleEntity, (role) => role.users, { eager: true })
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: RoleEntity[];

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses: AddressEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
