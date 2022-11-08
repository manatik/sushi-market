import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from '@typeorm/Base';
import { UserEntity } from '@user/enitity/user.entity';

@Entity('user_addresses')
export class AddressEntity extends Base {
  @Column()
  address: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  comment: string;

  @DeleteDateColumn({ name: 'date_deleted' })
  dateDeleted: Date;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
