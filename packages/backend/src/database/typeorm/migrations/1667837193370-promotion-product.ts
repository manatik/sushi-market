import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PromotionProduct1667837193370 implements MigrationInterface {
  private TABLE_NAME = 'promotion_product';

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
            name: 'product_id',
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
            name: 'fk_promotion-product_promotion',
            referencedTableName: 'promotion',
            referencedColumnNames: ['id'],
            columnNames: ['promotion_id'],
            onDelete: 'CASCADE',
          },
          {
            name: 'fk_promotion-product_product',
            referencedTableName: 'product',
            referencedColumnNames: ['id'],
            columnNames: ['product_id'],
            onDelete: 'CASCADE',
          },
        ],
        uniques: [{ name: 'uniq-promotion_id-product_id', columnNames: ['product_id', 'promotion_id'] }],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.TABLE_NAME, true, true, true);
  }
}
