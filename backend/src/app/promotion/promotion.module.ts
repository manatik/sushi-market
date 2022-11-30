import { ErrorModule } from '@error/error.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosModule } from '@photos/photos.module';
import { PromotionEntity } from '@promotion/entity/promotion.entity';
import { PromotionController } from '@promotion/promotion.controller';
import { PromotionService } from '@promotion/promotion.service';

@Module({
  imports: [ErrorModule, PhotosModule, TypeOrmModule.forFeature([PromotionEntity])],
  controllers: [PromotionController],
  providers: [PromotionService],
  exports: [],
})
export class PromotionModule {}
