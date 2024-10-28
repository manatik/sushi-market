import { PhotosEntity } from '@photos/entity/photos.entity';
import { ProductEntity } from '@product/entity/product.entity';
import { Base } from '@typeorm/Base';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { PromotionBannerEntity } from '../../promotion-banner/entity/promotion-banner.entity';

export enum TypePromotion {
  COMBO = 'combo',
  PROMOTION = 'promo',
}

@Entity('promotion')
export class PromotionEntity extends Base {
  @Column()
  article: string;

  @Column()
  discount: number;

  @Column()
  name: string;

  @Column()
  promocode: string;

  @Column({ name: 'is_disposable' })
  isDisposable: boolean;

  @Column({ name: 'type_promotion', enum: TypePromotion })
  typePromotion: TypePromotion;

  @Column({ name: 'old_price' })
  oldPrice: number;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column({ name: 'date_start' })
  dateStart: Date;

  @Column({ name: 'date_end' })
  dateEnd: Date;

  @ManyToMany(() => ProductEntity, (product) => product.promotions, { eager: true })
  @JoinTable({
    name: 'promotion_product',
    joinColumn: { name: 'promotion_id' },
    inverseJoinColumn: { name: 'product_id' },
  })
  products: ProductEntity[];

  @ManyToMany(() => PhotosEntity, (photo) => photo.promotions)
  photos: PhotosEntity[];

  @OneToMany(() => PromotionBannerEntity, (banners) => banners.promotion)
  banners: PromotionBannerEntity[];
}
