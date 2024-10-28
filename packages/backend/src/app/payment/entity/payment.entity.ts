import { OrderEntity } from '@order/entity/order.entity';
import { Base } from '@typeorm/Base';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class PaymentEntity extends Base {
  @Column({ name: 'code', unique: true })
  code: number;

  @Column({ name: 'name', unique: true })
  name: string;

  @OneToMany(() => OrderEntity, (order) => order.payment)
  orders: OrderEntity[];
}
