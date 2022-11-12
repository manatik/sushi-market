import { ErrorModule } from '@error/error.module';
import { Module } from '@nestjs/common';
import { ProductController } from '@product/product.controller';
import { ProductService } from '@product/product.service';

@Module({
  imports: [ErrorModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [],
})
export class ProductModule {}
