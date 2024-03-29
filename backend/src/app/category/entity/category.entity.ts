import { ProductEntity } from '@product/entity/product.entity';
import { SubCategoryEntity } from '@sub-category/entity/sub-category.entity';
import { Base } from '@typeorm/Base';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('category')
export class CategoryEntity extends Base {
  @Column()
  name: string;

  @Column()
  article: string;

  @Column()
  code: string;

  @Column({ name: 'order_by' })
  orderBy: number;

  @OneToMany(() => SubCategoryEntity, (sub) => sub.category)
  subCategories: SubCategoryEntity[];

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
