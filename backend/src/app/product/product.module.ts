import { ErrorModule } from '@error/error.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@product/entity/product.entity';
import { ProductController } from '@product/product.controller';
import { ProductService } from '@product/product.service';
import { PhotosModule } from '@photos/photos.module';

@Module({
  imports: [ErrorModule, TypeOrmModule.forFeature([ProductEntity]), PhotosModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [],
})
export class ProductModule {}
