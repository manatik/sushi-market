import { Base } from '@typeorm/Base';
import { Column, DeleteDateColumn, Entity, JoinColumn, OneToMany } from 'typeorm';
import { PointOfSaleEntity } from '@point-of-sale/entity/point-of-sale.entity';

@Entity('district')
export class DistrictEntity extends Base {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'point_sale_id' })
  pointSaleId?: string;

  @Column({ name: 'min_sum_order' })
  minSumOrder: number;

  @Column({ name: 'price_delivery' })
  priceDelivery: number;

  @Column({ name: 'price_free_delivery' })
  priceFreeDelivery: number;

  @DeleteDateColumn({ name: 'date_deleted' })
  dateDeleted?: Date;

  @OneToMany(() => PointOfSaleEntity, (ps) => ps.districts)
  @JoinColumn({ name: 'point_sale_id', referencedColumnName: 'id' })
  pointOfSale: PointOfSaleEntity;
}
