import { Module } from '@nestjs/common';
import { RoleService } from '@role/role.service';
import { ErrorModule } from '@error/error.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '@role/entity/role.entity';
import { RoleController } from '@role/role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]), ErrorModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [],
})
export class RoleModule {}
