import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PointsOfSale1667837514481 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'points_of_sale',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'address_point_sale',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'fp_api_code',
            type: 'varchar',
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'operating_mode_point_sale',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'operating_mode_delivery',
            type: 'varchar',
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
    await queryRunner.dropTable('points_of_sale', true, true, true);
  }
}
