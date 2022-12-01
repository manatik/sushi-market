import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Order1667837193370 implements MigrationInterface {
  private TABLE_NAME = 'order';

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
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'payment_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'status_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'price_total',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'order_number',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'comment',
            type: 'varchar',
          },
          {
            name: 'date_order',
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
        foreignKeys: [
          {
            name: 'fk_order_user',
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
          },
          {
            name: 'fk_order_order-status',
            referencedTableName: 'order_status',
            referencedColumnNames: ['id'],
            columnNames: ['status_id'],
            onDelete: 'SET NULL',
          },
          {
            name: 'fk_order_payment',
            referencedTableName: 'payment',
            referencedColumnNames: ['id'],
            columnNames: ['payment_id'],
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
