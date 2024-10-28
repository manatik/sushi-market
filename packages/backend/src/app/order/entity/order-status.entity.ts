import { OrderEntity } from '@order/entity/order.entity';
import { Base } from '@typeorm/Base';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('order_status')
export class OrderStatusEntity extends Base {
  @Column({ name: 'code', unique: true })
  code: string;

  @Column({ name: 'status', unique: true })
  status: string;

  @OneToMany(() => OrderEntity, (order) => order.status)
  orders: OrderEntity[];
}
