import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class OrderPromotion1667837614537 implements MigrationInterface {
  private TABLE_NAME = 'order_promotion';

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
            name: 'article',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'discount',
            type: 'int',
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
            isNullable: true,
          },
          {
            name: 'is_disposable',
            type: 'bool',
            isNullable: true,
            default: true,
          },
          {
            name: 'type_promotion',
            type: 'enum',
            isNullable: false,
            enum: ['combo', 'promo'],
            enumName: 'type_promotion',
          },
          {
            name: 'old_price',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
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
    await queryRunner.dropTable(this.TABLE_NAME, true, true, true);
  }
}
