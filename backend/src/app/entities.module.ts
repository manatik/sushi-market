import { CategoryModule } from '@category/category.module';
import { DistrictModule } from '@district/district.module';
import { IngredientModule } from '@ingredient/ingredient.module';
import { Module } from '@nestjs/common';
import { OrderModule } from '@order/order.module';
import { PaymentModule } from '@payment/payment.module';
import { PhotosEntity } from '@photos/entity/photos.entity';
import { PointOfSaleModule } from '@point-of-sale/point-of-sale.module';
import { ProductModule } from '@product/product.module';
import { PromotionModule } from '@promotion/promotion.module';
import { RoleModule } from '@role/role.module';
import { SubCategoryModule } from '@sub-category/sub-category.module';
import { UserModule } from '@user/user.module';

@Module({
  imports: [
    CategoryModule,
    DistrictModule,
    IngredientModule,
    OrderModule,
    PaymentModule,
    PhotosEntity,
    PointOfSaleModule,
    ProductModule,
    PromotionModule,
    RoleModule,
    SubCategoryModule,
    UserModule,
  ],
  exports: [
    CategoryModule,
    DistrictModule,
    IngredientModule,
    OrderModule,
    PaymentModule,
    PhotosEntity,
    PointOfSaleModule,
    ProductModule,
    PromotionModule,
    RoleModule,
    SubCategoryModule,
    UserModule,
  ],
})
export class EntitiesModule {}
