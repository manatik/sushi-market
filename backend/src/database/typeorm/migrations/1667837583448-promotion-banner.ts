import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PromotionBanner1667837583448 implements MigrationInterface {
  private TABLE_NAME = 'promotion_banner';

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
            name: 'promotion_id',
            type: 'uuid',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'order_by',
            type: 'int',
            isNullable: false,
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
          {
            name: 'date_deleted',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_promotion-banner_promotion',
            columnNames: ['promotion_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'promotion',
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
