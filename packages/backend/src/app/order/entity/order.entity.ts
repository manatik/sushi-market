import { OrderProductEntity } from '@order/entity/order-product.entity';
import { OrderPromotionEntity } from '@order/entity/order-promotion.entity';
import { OrderStatusEntity } from '@order/entity/order-status.entity';
import { PaymentEntity } from '@payment/entity/payment.entity';
import { Base } from '@typeorm/Base';
import { UserEntity } from '@user/enitity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('order')
export class OrderEntity extends Base {
  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'phone', nullable: false })
  phone: string;

  @Column({ name: 'email', nullable: true })
  email: string;

  @Column({ name: 'order_number', nullable: false })
  orderNumber: string;

  @Column({ name: 'price_total', nullable: false })
  priceTotal: number;

  @Column({ name: 'address', nullable: false })
  address: string;

  @Column({ name: 'comment', nullable: true })
  comment: string;

  @Column({ name: 'date_order', nullable: false })
  dateOrder: Date;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @Column({ name: 'status_id', nullable: true })
  statusId: string;

  @Column({ name: 'payment_id', nullable: true })
  paymentId: string;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => OrderStatusEntity, (orderStatus) => orderStatus.orders)
  @JoinColumn({ name: 'status_id' })
  status: OrderStatusEntity;

  @ManyToOne(() => PaymentEntity, (payment) => payment.orders)
  @JoinColumn({ name: 'payment_id' })
  payment: PaymentEntity;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order)
  products: OrderProductEntity[];

  @OneToMany(() => OrderPromotionEntity, (orderPromotion) => orderPromotion.order)
  promotions: OrderPromotionEntity[];
}
