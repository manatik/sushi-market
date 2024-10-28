import { PromotionEntity } from '@promotion/entity/promotion.entity';
import { Base } from '@typeorm/Base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('promotion_banner')
export class PromotionBannerEntity extends Base {
  @Column({ name: 'promotion_id', type: 'uuid' })
  promotionId: string;

  @Column({ name: 'order_by' })
  orderBy: number;

  @ManyToOne(() => PromotionEntity, (promotions) => promotions.banners)
  @JoinColumn({ name: 'promotion_id' })
  promotion: PromotionEntity;
}
