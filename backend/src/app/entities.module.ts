import { CategoryModule } from '@category/category.module';
import { Module } from '@nestjs/common';
import { ProductModule } from '@product/product.module';
import { PromotionModule } from '@promotion/promotion.module';
import { SubCategoryModule } from '@sub-category/sub-category.module';
import { UserModule } from '@user/user.module';
import { RoleModule } from '@role/role.module';
import { PhotosEntity } from '@photos/entity/photos.entity';

@Module({
  imports: [UserModule, RoleModule, CategoryModule, SubCategoryModule, ProductModule, PhotosEntity, PromotionModule],
  exports: [UserModule, RoleModule, CategoryModule, SubCategoryModule, ProductModule, PhotosEntity, PromotionModule],
})
export class EntitiesModule {}
