import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Promotion1667837209055 implements MigrationInterface {
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
            referencedColumnNames: ['id'],
            referencedTableName: 'photos',
            columnNames: ['photos_id'],
            onDelete: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('promotion', true, true, true);
  }
}
