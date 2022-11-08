import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class OrderProduct1667837257584 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_product',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'order_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'count',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'sub_category_id',
            type: 'uuid',
            isNullable: false,
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
            referencedTableName: 'order',
            columnNames: ['order_id'],
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_product', true, true, true);
  }
}
