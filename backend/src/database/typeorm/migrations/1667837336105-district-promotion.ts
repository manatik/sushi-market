import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class DistrictPromotion1667837405615 implements MigrationInterface {
  private TABLE_NAME = 'district_promotion';

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
            name: 'district_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'promotion_id',
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
          {
            name: 'date_deleted',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_district-promotion_promotion',
            referencedTableName: 'promotion',
            referencedColumnNames: ['id'],
            columnNames: ['promotion_id'],
            onDelete: 'CASCADE',
          },
          {
            name: 'fk_district-promotion_district',
            referencedTableName: 'district',
            referencedColumnNames: ['id'],
            columnNames: ['district_id'],
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
