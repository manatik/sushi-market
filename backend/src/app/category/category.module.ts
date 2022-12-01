import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '@category/entity/category.entity';
import { ErrorModule } from '@error/error.module';
import { CategoryController } from '@category/category.controller';
import { CategoryService } from '@category/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), ErrorModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [],
})
export class CategoryModule {}
