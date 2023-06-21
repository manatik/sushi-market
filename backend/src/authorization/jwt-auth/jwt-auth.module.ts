import { ErrorModule } from '@error/error.module';
import { JwtAuthController } from '@jwt-auth/jwt-auth.controller';
import { JwtAuthService } from '@jwt-auth/jwt-auth.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RoleModule } from '@role/role.module';
import { UserModule } from '@user/user.module';

@Module({
  imports: [UserModule, ErrorModule, JwtModule.register({ global: true }), RoleModule, ConfigModule],
  controllers: [JwtAuthController],
  providers: [JwtAuthService],
  exports: [],
})
export class JwtAuthModule {}
