import { Base } from '@typeorm/Base';
import { Column, DeleteDateColumn, Entity } from 'typeorm';

@Entity('photo')
export class PhotosEntity extends Base {
  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  filename: string;

  @Column({ name: 'original_filename' })
  originalFilename: string;

  @Column()
  description: string;

  @DeleteDateColumn({ name: 'date_deleted' })
  dateDeleted: Date;
}
