import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ProductPhoto1667836976487 implements MigrationInterface {
  private TABLE_NAME = 'product_photo';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.TABLE_NAME,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'product_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'photo_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'date_created',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'date_updated',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_product-photo_product',
            referencedTableName: 'product',
            referencedColumnNames: ['id'],
            columnNames: ['product_id'],
            onDelete: 'CASCADE',
          },
          {
            name: 'fk_product-photo_photo',
            referencedTableName: 'photo',
            referencedColumnNames: ['id'],
            columnNames: ['photo_id'],
            onDelete: 'CASCADE',
          },
        ],
        uniques: [{ name: 'uniq-product_id-photo_id', columnNames: ['product_id', 'photo_id'] }],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.TABLE_NAME, true, true, true);
  }
}
