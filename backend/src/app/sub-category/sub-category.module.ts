import { ErrorModule } from '@error/error.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoryEntity } from '@sub-category/entity/sub-category.entity';
import { SubCategoryController } from '@sub-category/sub-category.controller';
import { SubCategoryService } from '@sub-category/sub-category.service';

@Module({
  imports: [ErrorModule, TypeOrmModule.forFeature([SubCategoryEntity])],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
  exports: [],
})
export class SubCategoryModule {}
