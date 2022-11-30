import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Promotion1667837193367 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'promotion',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
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
            type: 'NUMERIC(7,2)',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'NUMERIC(7,2)',
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
    await queryRunner.dropTable('promotion', true, true, true);
  }
}
