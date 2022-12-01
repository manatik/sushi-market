import { CategoryEntity } from '@category/entity/category.entity';
import { ProductEntity } from '@product/entity/product.entity';
import { Base } from '@typeorm/Base';
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('sub-category')
export class SubCategoryEntity extends Base {
  @Column()
  name: string;

  @Column()
  article: string;

  @Column({ name: 'order_by' })
  orderBy: number;

  @Column()
  hidden: boolean;

  @DeleteDateColumn({ name: 'date_deleted' })
  dateDeleted: Date;

  @Column({ name: 'category_id' })
  categoryId: string;

  @ManyToOne(() => CategoryEntity, (category) => category.subCategories)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @OneToMany(() => ProductEntity, (product) => product.subCategory)
  products: ProductEntity[];
}
