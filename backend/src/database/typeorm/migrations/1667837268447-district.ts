import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class District1667837268447 implements MigrationInterface {
  private TABLE_NAME = 'district';

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
            name: 'name',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'point_sale_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'min_sum_order',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'price_delivery',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'price_free_delivery',
            type: 'int',
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
          {
            name: 'date_deleted',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'fk-district-points_of_sale',
            referencedTableName: 'points_of_sale',
            referencedColumnNames: ['id'],
            columnNames: ['point_sale_id'],
            onDelete: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.TABLE_NAME, true, true, true);
  }
}
