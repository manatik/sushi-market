import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class OrderProduct1667837257584 implements MigrationInterface {
  private TABLE_NAME = 'order_product';

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
            isNullable: true,
          },
          {
            name: 'category_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'article',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'calories',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'proteins',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'fats',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'carbohydrates',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'weight',
            type: 'varchar',
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
    await queryRunner.dropTable(this.TABLE_NAME, true, true, true);
  }
}
