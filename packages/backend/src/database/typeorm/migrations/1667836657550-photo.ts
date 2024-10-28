import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Photo1667836657550 implements MigrationInterface {
  private TABLE_NAME = 'photo';

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
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'path',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'remote_path',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'filename',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'original_filename',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'size',
            type: 'int',
            isNullable: false,
            default: 0,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
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
    await queryRunner.dropTable(this.TABLE_NAME, true, true, true);
  }
}
