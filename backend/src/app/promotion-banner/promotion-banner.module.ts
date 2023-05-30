import { ErrorModule } from '@error/error.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionBannerEntity } from './entity/promotion-banner.entity';
import { PromotionBannerController } from './promotion-banner.controller';
import { PromotionBannerService } from './promotion-banner.service';

@Module({
  imports: [ErrorModule, TypeOrmModule.forFeature([PromotionBannerEntity])],
  controllers: [PromotionBannerController],
  providers: [PromotionBannerService],
  exports: [],
})
export class PromotionBannerModule {}
