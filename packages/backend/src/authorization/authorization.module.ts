import { Module } from '@nestjs/common';
import { JwtAuthModule } from '@jwt-auth/jwt-auth.module';

@Module({
  imports: [JwtAuthModule],
  exports: [JwtAuthModule],
})
export class AuthorizationModule {}
