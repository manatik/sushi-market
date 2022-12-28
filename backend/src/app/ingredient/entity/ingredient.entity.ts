import { ProductEntity } from '@product/entity/product.entity';
import { Base } from '@typeorm/Base';
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity('ingredient')
export class IngredientEntity extends Base {
  @Column()
  name: string;

  @Column()
  description: string;

  @DeleteDateColumn({ name: 'date_deleted' })
  dateDeleted: Date;

  @ManyToMany(() => ProductEntity, (product) => product.ingredients)
  @JoinTable({
    name: 'product_ingredient',
    joinColumn: { name: 'ingredient_id' },
    inverseJoinColumn: { name: 'product_id' },
  })
  products: ProductEntity[];
}
