import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class District1667837193366 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'district',
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
            isNullable: false,
          },
          {
            name: 'min_sum_order',
            type: 'NUMERIC(7,2)',
            isNullable: false,
          },
          {
            name: 'price_delivery',
            type: 'NUMERIC(7,2)',
            isNullable: false,
          },
          {
            name: 'price_free_delivery',
            type: 'NUMERIC(7,2)',
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('district', true, true, true);
  }
}
