import { Base } from '@typeorm/Base';
import { UserEntity } from '@user/enitity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('user_addresses')
export class AddressEntity extends Base {
  @Column()
  address: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  comment: string;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
