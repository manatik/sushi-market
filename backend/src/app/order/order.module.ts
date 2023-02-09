import { ErrorModule } from '@error/error.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProductEntity } from '@order/entity/order-product.entity';
import { OrderPromotionEntity } from '@order/entity/order-promotion.entity';
import { OrderStatusEntity } from '@order/entity/order-status.entity';
import { OrderEntity } from '@order/entity/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderStatusEntity, OrderProductEntity, OrderPromotionEntity]),
    ErrorModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
})
export class OrderModule {}
