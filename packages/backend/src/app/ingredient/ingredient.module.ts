import { ErrorModule } from '@error/error.module';
import { IngredientEntity } from '@ingredient/entity/ingredient.entity';
import { Module } from '@nestjs/common';
import { IngredientController } from '@ingredient/ingredient.controller';
import { IngredientService } from '@ingredient/ingredient.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ErrorModule, TypeOrmModule.forFeature([IngredientEntity])],
  controllers: [IngredientController],
  providers: [IngredientService],
  exports: [],
})
export class IngredientModule {}
