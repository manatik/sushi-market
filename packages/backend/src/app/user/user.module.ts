import { Module } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@user/enitity/user.entity';
import { ErrorModule } from '@error/error.module';
import { UserController } from '@user/user.controller';
import { AddressEntity } from '@user/enitity/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AddressEntity]), ErrorModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
