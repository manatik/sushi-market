import { OrderEntity } from '@order/entity/order.entity';
import { Base } from '@typeorm/Base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('order_product')
export class OrderProductEntity extends Base {
  @Column({ name: 'count' })
  count: number;

  @Column({ name: 'sub_category_id' })
  sub_category_id: string;

  @Column({ name: 'category_id' })
  category_id: string;

  @Column({ name: 'article' })
  article: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'calories' })
  calories: string;

  @Column({ name: 'proteins' })
  proteins: string;

  @Column({ name: 'fats' })
  fats: string;

  @Column({ name: 'carbohydrates' })
  carbohydrates: string;

  @Column({ name: 'weight' })
  weight: string;

  @Column({ name: 'order_id' })
  orderId: string;

  @ManyToOne(() => OrderEntity, (order) => order.products)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;
}
