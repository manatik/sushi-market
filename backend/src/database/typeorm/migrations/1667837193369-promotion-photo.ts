import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PromotionPhoto1667837193369 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'promotion_photo',
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
            name: 'fk_promotion-photo_promotion',
            referencedTableName: 'promotion',
            referencedColumnNames: ['id'],
            columnNames: ['promotion_id'],
            onDelete: 'SET NULL',
          },
          {
            name: 'fk_promotion-photo_photo',
            referencedTableName: 'photo',
            referencedColumnNames: ['id'],
            columnNames: ['photo_id'],
            onDelete: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('promotion_photo', true, true, true);
  }
}
