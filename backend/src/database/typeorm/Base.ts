import { BeforeUpdate, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'date_created' })
  dateCreated: Date;

  @UpdateDateColumn({ name: 'date_updated' })
  dateUpdated: Date;

  @BeforeUpdate()
  async update() {
    this.dateUpdated = new Date();
  }
}
