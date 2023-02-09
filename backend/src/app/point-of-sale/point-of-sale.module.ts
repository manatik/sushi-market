import { ErrorModule } from '@error/error.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointOfSaleEntity } from '@point-of-sale/entity/point-of-sale.entity';
import { PointOfSaleController } from './point-of-sale.controller';
import { PointOfSaleService } from './point-of-sale.service';

@Module({
  imports: [TypeOrmModule.forFeature([PointOfSaleEntity]), ErrorModule],
  controllers: [PointOfSaleController],
  providers: [PointOfSaleService],
  exports: [],
})
export class PointOfSaleModule {}
