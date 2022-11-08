import { Column, DeleteDateColumn, Entity } from 'typeorm';
import { Base } from '@typeorm/Base';

@Entity('category')
export class CategoryEntity extends Base {
  @Column()
  name: string;

  @Column()
  article: string;

  @Column()
  code: string;

  @Column()
  hidden: boolean;

  @Column({ name: 'order_by' })
  orderBy: number;

  @DeleteDateColumn({ name: 'date_deleted' })
  dateDeleted: Date;
}
