import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUsers1624836340363 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'rut', type: 'varchar', length: '12', isUnique: true },
          { name: 'password', type: 'text' },
          { name: 'last_connection', type: 'timestamp', isNullable: true },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
