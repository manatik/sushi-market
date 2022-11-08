import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Product1667836799605 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'sub_category_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'category_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'photos_id',
            type: 'uuid',
          },
          {
            name: 'article',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'hidden',
            type: 'boolean',
            default: false,
          },
          {
            name: 'order_by',
            type: 'int',
            default: 1,
          },
          {
            name: 'price',
            type: 'NUMERIC(7,2)',
            isNullable: false,
          },
          {
            name: 'calories',
            type: 'varchar',
          },
          {
            name: 'proteins',
            type: 'varchar',
          },
          {
            name: 'fats',
            type: 'varchar',
          },
          {
            name: 'carbohydrates',
            type: 'varchar',
          },
          {
            name: 'weight',
            type: 'varchar',
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
          {
            name: 'date_deleted',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_product_category',
            referencedTableName: 'category',
            referencedColumnNames: ['id'],
            columnNames: ['category_id'],
            onDelete: 'CASCADE',
          },
          {
            name: 'fk_product_sub-category',
            referencedTableName: 'sub_category',
            referencedColumnNames: ['id'],
            columnNames: ['sub_category_id'],
            onDelete: 'CASCADE',
          },
          {
            name: 'fk_product_photos',
            referencedTableName: 'photos',
            referencedColumnNames: ['id'],
            columnNames: ['photos_id'],
            onDelete: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product', true, true, true);
  }
}
