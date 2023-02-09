import { PointOfSaleEntity } from '@point-of-sale/entity/point-of-sale.entity';
import { Base } from '@typeorm/Base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => PointOfSaleEntity, (ps) => ps.districts)
  @JoinColumn({ name: 'point_sale_id' })
  pointOfSale: PointOfSaleEntity;
}
