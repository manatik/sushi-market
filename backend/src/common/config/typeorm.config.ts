import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

export const getTypeormConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: 'db',
  port: parseInt(configService.get('PG_PORT')),
  database: configService.get('PG_DB'),
  username: configService.get('PG_USER'),
  password: configService.get('PG_PASSWORD'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/typeorm/migrations/**/*.js'],
  autoLoadEntities: true,
  synchronize: false,
});

export const getDataSourceFactory = async (options: DataSourceOptions) => {
  const datasorce = await new DataSource(options).initialize();
  datasorce.runMigrations({ transaction: 'all' });
  // await datasorce.dropDatabase();
  return datasorce;
};
