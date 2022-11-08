import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ProductIngredient1667836976486 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_ingredient',
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
            name: 'ingredient_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'count',
            type: 'int',
            default: 1,
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
            referencedColumnNames: ['id'],
            referencedTableName: 'product',
            columnNames: ['product_id'],
            onDelete: 'CASCADE',
          },
          {
            referencedColumnNames: ['id'],
            referencedTableName: 'ingredient',
            columnNames: ['ingredient_id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_ingredient', true, true, true);
  }
}
