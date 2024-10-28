import { OrderEntity } from '@order/entity/order.entity';
import { TypePromotion } from '@promotion/entity/promotion.entity';
import { Base } from '@typeorm/Base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('order_promotion')
export class OrderPromotionEntity extends Base {
  @Column({ name: 'article' })
  article: string;

  @Column({ name: 'discount' })
  discount: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'promocode' })
  promocode: string;

  @Column({ name: 'is_disposable' })
  is_disposable: boolean;

  @Column({ name: 'type_promotion', enum: TypePromotion })
  type_promotion: TypePromotion;

  @Column({ name: 'old_price' })
  old_price: number;

  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'date_start' })
  date_start: Date;

  @Column({ name: 'date_end' })
  date_end: Date;

  @Column({ name: 'order_id' })
  orderId: string;

  @ManyToOne(() => OrderEntity, (order) => order.promotions)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;
}
