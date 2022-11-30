import { DataSource } from 'typeorm';

const typeormConfig = new DataSource({
  type: 'postgres',
  host: 'db-host',
  port: 5432,
  database: 'db-name',
  username: 'db-username',
  password: 'db-password',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/typeorm/migrations/**/*.js'],
  synchronize: false,
  logging: true,
});

export default typeormConfig;
