-- CreateEnum
CREATE TYPE "type_promotion" AS ENUM ('combo', 'promo');

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "article" VARCHAR NOT NULL,
    "code" VARCHAR NOT NULL,
    "order_by" INTEGER NOT NULL DEFAULT 1,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),
    "date_deleted" TIMESTAMP(6),

    CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "District" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "point_sale_id" UUID,
    "min_sum_order" INTEGER NOT NULL,
    "price_delivery" INTEGER NOT NULL,
    "price_free_delivery" INTEGER NOT NULL,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),
    "date_deleted" TIMESTAMP(6),

    CONSTRAINT "PK_ee5cb6fd5223164bb87ea693f1e" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DistrictProduct" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "district_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),
    "date_deleted" TIMESTAMP(6),

    CONSTRAINT "PK_bb6600a2705c1e37f3918742f80" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DistrictPromotion" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "district_id" UUID NOT NULL,
    "promotion_id" UUID NOT NULL,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),
    "date_deleted" TIMESTAMP(6),

    CONSTRAINT "PK_92cb4aba263237e69d69a08b483" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "message" VARCHAR NOT NULL,
    "image_path" VARCHAR NOT NULL,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),
    "date_deleted" TIMESTAMP(6),

    CONSTRAINT "PK_8389f9e087a57689cd5be8b2b13" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),
    "date_deleted" TIMESTAMP(6),

    CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Migrations" (
    "id" SERIAL NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID,
    "payment_id" UUID,
    "status_id" UUID,
    "price_total" INTEGER NOT NULL,
    "order_number" VARCHAR NOT NULL,
    "phone" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR,
    "address" VARCHAR NOT NULL,
    "comment" VARCHAR,
    "date_order" TIMESTAMP(6) NOT NULL,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),
    "date_deleted" TIMESTAMP(6),

    CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderProduct" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "order_id" UUID NOT NULL,
    "count" INTEGER NOT NULL,
    "sub_category_id" UUID,
    "category_id" UUID,
    "article" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "price" INTEGER NOT NULL,
    "calories" VARCHAR,
    "proteins" VARCHAR,
    "fats" VARCHAR,
    "carbohydrates" VARCHAR,
    "weight" VARCHAR,

    CONSTRAINT "PK_539ede39e518562dfdadfddb492" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderPromotion" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "order_id" UUID NOT NULL,
    "article" VARCHAR NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "name" VARCHAR NOT NULL,
    "promocode" VARCHAR,
    "is_disposable" BOOLEAN DEFAULT true,
    "type_promotion" "type_promotion" NOT NULL,
    "old_price" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "description" VARCHAR,
    "date_start" TIMESTAMP(6) NOT NULL,
    "date_end" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "PK_cc0131c78b2fd0eb50395732cbe" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderStatus" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "code" VARCHAR NOT NULL,
    "status" VARCHAR NOT NULL,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),
    "date_deleted" TIMESTAMP(6),

    CONSTRAINT "PK_8ea75b2a26f83f3bc98b9c6aaf6" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "code" INTEGER NOT NULL,
    "name" VARCHAR NOT NULL,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),
    "date_deleted" TIMESTAMP(6),

    CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "path" VARCHAR NOT NULL,
    "remote_path" VARCHAR NOT NULL,
    "filename" VARCHAR NOT NULL,
    "original_filename" VARCHAR NOT NULL,
    "size" INTEGER NOT NULL DEFAULT 0,
    "description" VARCHAR,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),
    "date_deleted" TIMESTAMP(6),

    CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PointsOfSale" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "address_point_sale" VARCHAR NOT NULL,
    "fp_api_code" VARCHAR,
    "city" VARCHAR NOT NULL,
    "operating_mode_point_sale" VARCHAR NOT NULL,
    "operating_mode_delivery" VARCHAR NOT NULL,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),
    "date_deleted" TIMESTAMP(6),

    CONSTRAINT "PK_4635613a15bd74725e9b6547273" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "sub_category_id" UUID,
    "category_id" UUID,
    "article" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "order_by" INTEGER NOT NULL DEFAULT 1,
    "price" INTEGER NOT NULL,
    "calories" VARCHAR,
    "proteins" VARCHAR,
    "fats" VARCHAR,
    "carbohydrates" VARCHAR,
    "weight" VARCHAR,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),
    "date_deleted" TIMESTAMP(6),

    CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductIngredient" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "product_id" UUID NOT NULL,
    "ingredient_id" UUID NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),

    CONSTRAINT "PK_e7431906c21f94c0152d6b0db99" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductPhoto" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "product_id" UUID NOT NULL,
    "photo_id" UUID NOT NULL,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),

    CONSTRAINT "PK_6c701613676cfa922e429eb1bae" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromocodeUser" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "promocode_id" UUID NOT NULL,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),
    "date_deleted" TIMESTAMP(6),

    CONSTRAINT "PK_598c07fcf799d18d3bd739b5db0" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promotion" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "article" VARCHAR NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "name" VARCHAR NOT NULL,
    "promocode" VARCHAR,
    "is_disposable" BOOLEAN DEFAULT true,
    "type_promotion" "type_promotion" NOT NULL,
    "old_price" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "description" VARCHAR,
    "date_start" TIMESTAMP(6) NOT NULL,
    "date_end" TIMESTAMP(6) NOT NULL,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),
    "date_deleted" TIMESTAMP(6),

    CONSTRAINT "PK_fab3630e0789a2002f1cadb7d38" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionBanner" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "promotion_id" UUID NOT NULL,
    "order_by" INTEGER NOT NULL DEFAULT 1,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),
    "date_deleted" TIMESTAMP(6),

    CONSTRAINT "PK_4f4a57df95170e73b622d9e9ae3" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionPhoto" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "promotion_id" UUID NOT NULL,
    "photo_id" UUID NOT NULL,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),

    CONSTRAINT "PK_43bfe9f6764de36b2f1c4efdebc" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionProduct" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "product_id" UUID NOT NULL,
    "promotion_id" UUID NOT NULL,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),
    "date_deleted" TIMESTAMP(6),

    CONSTRAINT "PK_63567e833c47688b0d2a1e40ceb" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),
    "date_deleted" TIMESTAMP(6),

    CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "category_id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "article" VARCHAR NOT NULL,
    "order_by" INTEGER NOT NULL DEFAULT 1,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),
    "date_deleted" TIMESTAMP(6),

    CONSTRAINT "PK_59f4461923255f1ce7fc5e7423c" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "active_address_id" UUID,
    "firstname" VARCHAR NOT NULL,
    "lastname" VARCHAR,
    "phone" VARCHAR NOT NULL,
    "birthdate" TIMESTAMP(6),
    "email" VARCHAR,
    "password" VARCHAR NOT NULL,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),
    "date_deleted" TIMESTAMP(6),

    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAddresses" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "address" VARCHAR NOT NULL,
    "comment" VARCHAR,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),
    "date_deleted" TIMESTAMP(6),

    CONSTRAINT "PK_8abbeb5e3239ff7877088ffc25b" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPromotion" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "promotion_id" UUID NOT NULL,
    "user_phone" VARCHAR NOT NULL,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),
    "date_deleted" TIMESTAMP(6),

    CONSTRAINT "PK_a384c712c001b8498406ae9a86c" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(6),

    CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_b86c3b363a296af3fb0f149b607" ON "Category"("article");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_652a15c02538138f021f1320de8" ON "Category"("code");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_d9ed355e46edb25f094ad3a6461" ON "District"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_b6802ac7fbd37aa71d856a95d8f" ON "Ingredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_0e5483b6e426d22dca7b6693477" ON "OrderProduct"("article");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_53bd54d6423573ec63fed9c2bc5" ON "OrderPromotion"("article");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_1bfc82f8855783afa668a77e297" ON "OrderPromotion"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_ff3b25e2b71f7eb2e2a8c4e6a56" ON "OrderPromotion"("promocode");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_5ba083ed178d6a695d146cd8769" ON "OrderStatus"("code");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_cebd2e1627ddddc1857fd335bcb" ON "OrderStatus"("status");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_a8816ab86cdecd6cc7f576ff82f" ON "Payment"("code");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_06a96865bf0d5a224c8dc13c653" ON "Payment"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_30665961aa3430b66b996f21824" ON "PointsOfSale"("address_point_sale");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_e6bad5d08f4ab9bdecedb8a97fd" ON "Product"("article");

-- CreateIndex
CREATE UNIQUE INDEX "uniq-product_id-photo_id" ON "ProductPhoto"("product_id", "photo_id");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_6855732c8fb73c367e144e3a2a3" ON "Promotion"("article");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_7dc10a09d1f198907d448e67425" ON "Promotion"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_12638e3b59003bf4b8bb06c030e" ON "Promotion"("promocode");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_c34e30e4837ab6e01f56ea7a855" ON "PromotionBanner"("promotion_id");

-- CreateIndex
CREATE UNIQUE INDEX "uniq-promotion_id-photo_id" ON "PromotionPhoto"("promotion_id", "photo_id");

-- CreateIndex
CREATE UNIQUE INDEX "uniq-promotion_id-product_id" ON "PromotionProduct"("product_id", "promotion_id");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_ae4578dcaed5adff96595e61660" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_6da5a16de1997e8f92702751332" ON "SubCategory"("article");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_8e1f623798118e629b46a9e6299" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_e12875dfb3b1d92d7d7c5377e22" ON "User"("email");

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "fk-district-points_of_sale" FOREIGN KEY ("point_sale_id") REFERENCES "PointsOfSale"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DistrictProduct" ADD CONSTRAINT "fk_district-product_district" FOREIGN KEY ("district_id") REFERENCES "District"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DistrictProduct" ADD CONSTRAINT "fk_district-product_product" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DistrictPromotion" ADD CONSTRAINT "fk_district-promotion_district" FOREIGN KEY ("district_id") REFERENCES "District"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DistrictPromotion" ADD CONSTRAINT "fk_district-promotion_promotion" FOREIGN KEY ("promotion_id") REFERENCES "Promotion"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "fk_feedback_order" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "fk_feedback_user" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "fk_order_order-status" FOREIGN KEY ("status_id") REFERENCES "OrderStatus"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "fk_order_payment" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "fk_order_user" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "FK_ea143999ecfa6a152f2202895e2" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OrderPromotion" ADD CONSTRAINT "fk_order-promotion_order" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "fk_product_category" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "fk_product_sub-category" FOREIGN KEY ("sub_category_id") REFERENCES "SubCategory"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductIngredient" ADD CONSTRAINT "FK_3f9b3e7181dc8cd771e6d513b7b" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductIngredient" ADD CONSTRAINT "FK_a7a4b2de441d2ab00df5b0d4cdd" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductPhoto" ADD CONSTRAINT "fk_product-photo_photo" FOREIGN KEY ("photo_id") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductPhoto" ADD CONSTRAINT "fk_product-photo_product" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PromocodeUser" ADD CONSTRAINT "fk_promocode-user_promotion" FOREIGN KEY ("promocode_id") REFERENCES "Promotion"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PromocodeUser" ADD CONSTRAINT "fk_promocode-user_user" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PromotionBanner" ADD CONSTRAINT "fk_promotion-banner_promotion" FOREIGN KEY ("promotion_id") REFERENCES "Promotion"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PromotionPhoto" ADD CONSTRAINT "fk_promotion-photo_photo" FOREIGN KEY ("photo_id") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PromotionPhoto" ADD CONSTRAINT "fk_promotion-photo_promotion" FOREIGN KEY ("promotion_id") REFERENCES "Promotion"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PromotionProduct" ADD CONSTRAINT "fk_promotion-product_product" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PromotionProduct" ADD CONSTRAINT "fk_promotion-product_promotion" FOREIGN KEY ("promotion_id") REFERENCES "Promotion"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "fk_sub-category_category" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserAddresses" ADD CONSTRAINT "fk_user-addresses_user" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserPromotion" ADD CONSTRAINT "fk_user-promotion_promotion" FOREIGN KEY ("promotion_id") REFERENCES "Promotion"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserPromotion" ADD CONSTRAINT "fk_user-promotion_user" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "fk_user-role_role" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "fk_user-role_user" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

