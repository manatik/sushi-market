import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class SubCategory1667836657564 implements MigrationInterface {
  private TABLE_NAME = 'sub_category';

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
            name: 'category_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'article',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'order_by',
            type: 'int',
            default: 1,
          },
          {
            name: 'hidden',
            type: 'boolean',
            default: false,
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
            name: 'fk_sub-category_category',
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'category',
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
