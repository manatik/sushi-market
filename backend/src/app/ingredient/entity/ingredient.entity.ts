import { ProductEntity } from '@product/entity/product.entity';
import { Base } from '@typeorm/Base';
import { Column, DeleteDateColumn, Entity, ManyToMany } from 'typeorm';

@Entity('ingredient')
export class IngredientEntity extends Base {
  @Column()
  name: string;

  @Column()
  description: string;

  @DeleteDateColumn({ name: 'date_deleted' })
  dateDeleted: Date;

  @ManyToMany(() => ProductEntity, (product) => product.ingredients)
  products: ProductEntity[];
}
