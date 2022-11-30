import { PhotosEntity } from '@photos/entity/photos.entity';
import { ProductEntity } from '@product/entity/product.entity';
import { Base } from '@typeorm/Base';
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany } from 'typeorm';

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

  @Column()
  price: number;

  @Column()
  description: string;

  @Column({ name: 'date_start' })
  dateStart: Date;

  @Column({ name: 'date_end' })
  dateEnd: Date;

  @DeleteDateColumn({ name: 'date_deleted' })
  dateDeleted: Date;

  @ManyToMany(() => ProductEntity, (product) => product.promotions)
  @JoinTable({
    name: 'promotion_product',
    joinColumn: { name: 'promotion_id' },
    inverseJoinColumn: { name: 'product_id' },
  })
  products: ProductEntity[];

  @ManyToMany(() => PhotosEntity, (photo) => photo.promotions, { eager: true })
  photos: PhotosEntity[];
}
