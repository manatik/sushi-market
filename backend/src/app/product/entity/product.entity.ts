import { CategoryEntity } from '@category/entity/category.entity';
import { SubCategoryEntity } from '@sub-category/entity/sub-category.entity';
import { Base } from '@typeorm/Base';
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('product')
export class ProductEntity extends Base {
  @Column()
  article: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  hidden: boolean;

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

  @DeleteDateColumn({ name: 'date_deleted' })
  dateDeleted: Date;

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
}
