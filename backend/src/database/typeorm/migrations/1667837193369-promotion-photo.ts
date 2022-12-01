import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PromotionPhoto1667837193369 implements MigrationInterface {
  private TABLE_NAME = 'promotion_photo';

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
            onDelete: 'CASCADE',
          },
          {
            name: 'fk_promotion-photo_photo',
            referencedTableName: 'photo',
            referencedColumnNames: ['id'],
            columnNames: ['photo_id'],
            onDelete: 'CASCADE',
          },
        ],
        uniques: [{ name: 'uniq-promotion_id-photo_id', columnNames: ['promotion_id', 'photo_id'] }],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.TABLE_NAME, true, true, true);
  }
}
