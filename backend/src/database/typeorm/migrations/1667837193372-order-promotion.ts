import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class OrderPromotion1667837614537 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_promotion',
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
            name: 'photos_id',
            type: 'uuid',
          },
          {
            name: 'article',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'discount',
            type: 'NUMERIC(7,2)',
            default: 0,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'promocode',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'kind_promo',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'type_promotion',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'old_price',
            type: 'NUMERIC(7,2)',
            isNullable: false,
          },
          {
            name: 'new_price',
            type: 'NUMERIC(7,2)',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'date_start',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'date_end',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'count',
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
            name: 'fk_order-promotion_order',
            referencedTableName: 'order',
            referencedColumnNames: ['id'],
            columnNames: ['order_id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_promotion', true, true, true);
  }
}
