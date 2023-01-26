import { DistrictEntity } from '@district/entity/district.entity';
import { Base } from '@typeorm/Base';
import { Column, DeleteDateColumn, Entity, ManyToOne } from 'typeorm';

@Entity('points_of_sale')
export class PointOfSaleEntity extends Base {
  @Column({ name: 'address_point_sale' })
  addressPointSale: string;

  @Column({ name: 'fp_api_code' })
  fpApiCode?: string;

  @Column({ name: 'city' })
  city: string;

  @Column({ name: 'operating_mode_point_sale' })
  operatingModePointSale: string;

  @Column({ name: 'operating_mode_delivery' })
  operatingModeDelivery: string;

  @DeleteDateColumn({ name: 'date_deleted' })
  dateDeleted?: Date;

  @ManyToOne(() => DistrictEntity, (district) => district.pointOfSale)
  districts: DistrictEntity[];
}
