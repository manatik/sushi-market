import { CategoryEntity } from '@category/entity/category.entity';
import { IngredientEntity } from '@ingredient/entity/ingredient.entity';
import { PhotosEntity } from '@photos/entity/photos.entity';
import { PromotionEntity } from '@promotion/entity/promotion.entity';
import { SubCategoryEntity } from '@sub-category/entity/sub-category.entity';
import { Base } from '@typeorm/Base';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity('product')
export class ProductEntity extends Base {
  @Column()
  article: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'order_by' })
  orderBy: number;

  @Column()
  price: number;

  @Column()
  calories: string;

  @Column()
  proteins: string;

  @Column()
  fats: string;

  @Column()
  carbohydrates: string;

  @Column()
  weight: string;

  @Column({ name: 'category_id' })
  categoryId: string;

  @Column({ name: 'sub_category_id' })
  subCategoryId: string;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @ManyToOne(() => SubCategoryEntity, (sub) => sub.products)
  @JoinColumn({ name: 'sub_category_id' })
  subCategory: SubCategoryEntity;

  @ManyToMany(() => PromotionEntity, (promotion) => promotion.products)
  promotions: PromotionEntity[];

  @ManyToMany(() => PhotosEntity, (photo) => photo.products, { eager: true })
  photos: PhotosEntity[];

  @ManyToMany(() => IngredientEntity, (ingredient) => ingredient.products)
  ingredients: IngredientEntity[];
}
