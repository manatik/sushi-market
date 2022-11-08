import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthService } from '@jwt-auth/jwt-auth.service';
import { UserModule } from '@user/user.module';
import { ErrorModule } from '@error/error.module';
import { RoleModule } from '@role/role.module';
import { JwtAuthController } from '@jwt-auth/jwt-auth.controller';

@Module({
  imports: [UserModule, ErrorModule, JwtModule, RoleModule, ConfigModule],
  controllers: [JwtAuthController],
  providers: [JwtAuthService, JwtStrategy],
  exports: [],
})
export class JwtAuthModule {}
