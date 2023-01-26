import { DistrictController } from '@district/district.controller';
import { DistrictService } from '@district/district.service';
import { DistrictEntity } from '@district/entity/district.entity';
import { ErrorModule } from '@error/error.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DistrictEntity]), ErrorModule],
  controllers: [DistrictController],
  providers: [DistrictService],
  exports: [],
})
export class DistrictModule {}
