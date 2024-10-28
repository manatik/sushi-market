import { BeforeUpdate, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'date_created' })
  dateCreated: Date;

  @UpdateDateColumn({ name: 'date_updated' })
  dateUpdated: Date;

  @DeleteDateColumn({ name: 'date_deleted' })
  dateDeleted: Date;

  @BeforeUpdate()
  async update() {
    this.dateUpdated = new Date();
  }
}
