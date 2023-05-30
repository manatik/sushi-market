import { ProductEntity } from '@product/entity/product.entity';
import { PromotionEntity } from '@promotion/entity/promotion.entity';
import { Base } from '@typeorm/Base';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity('photo')
export class PhotosEntity extends Base {
  @Column()
  name: string;

  @Column()
  path: string;

  @Column({ name: 'remote_path' })
  remotePath: string;

  @Column()
  filename: string;

  @Column({ name: 'original_filename' })
  originalFilename: string;

  @Column()
  description: string;

  @ManyToMany(() => ProductEntity, (product) => product.photos)
  @JoinTable({
    name: 'product_photo',
    joinColumn: { name: 'photo_id' },
    inverseJoinColumn: { name: 'product_id' },
  })
  products: ProductEntity[];

  @ManyToMany(() => PromotionEntity, (promotion) => promotion.photos)
  @JoinTable({
    name: 'promotion_photo',
    joinColumn: { name: 'photo_id' },
    inverseJoinColumn: { name: 'promotion_id' },
  })
  promotions: PromotionEntity[];
}
