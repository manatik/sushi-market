import { Module } from '@nestjs/common';
import { PointOfSaleController } from './point-of-sale.controller';
import { PointOfSaleService } from './point-of-sale.service';

@Module({
  imports: [],
  controllers: [PointOfSaleController],
  providers: [PointOfSaleService],
  exports: [],
})
export class PointOfSaleModule {}
