import { getJwtConfig } from '@config/jwt.config';
import { getDataSourceFactory, getTypeormConfig } from '@config/typeorm.config';
import { JwtAuthGuard } from '@jwt-auth/guards/jwt.guard';
import { RolesGuard } from '@jwt-auth/guards/roles.guard';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntitiesModule } from './app/entities.module';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeormConfig,
      dataSourceFactory: getDataSourceFactory,
    }),
    EntitiesModule,
    AuthorizationModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
