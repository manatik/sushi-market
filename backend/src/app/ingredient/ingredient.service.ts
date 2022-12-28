import { ErrorService } from '@error/error.service';
import { CreateIngredientDto } from '@ingredient/dto/create-ingredient.dto';
import { GetAllQuery } from '@ingredient/dto/get-all.query';
import { UpdateIngredientDto } from '@ingredient/dto/update-ingredient.dto';
import { IngredientEntity } from '@ingredient/entity/ingredient.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

@Injectable()
export class IngredientService {
  constructor(
    private readonly errorService: ErrorService,
    @InjectRepository(IngredientEntity)
    private readonly ingredientRepository: Repository<IngredientEntity>,
  ) {}
  async all(query: GetAllQuery) {
    try {
      const whereExpression: FindOptionsWhere<IngredientEntity> = {
        name: query.name ? ILike(`%${query.name}%`) : undefined,
      };

      const ingredients = await this.ingredientRepository.find({ where: whereExpression });

      return this.errorService.success('Ингредиенты успешно получены', { ingredients });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения ингредиентов', e.message);
    }
  }

  async byId(id: string) {
    try {
      const ingredient = await this.ingredientRepository.findOne({ where: { id } });

      return this.errorService.success('Ингредиент успешно получен', { ingredient });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения ингредиента', e.message);
    }
  }

  async create(dto: CreateIngredientDto) {
    try {
      const entity = this.ingredientRepository.create(dto);
      const ingredient = await this.ingredientRepository.save(entity);

      return this.errorService.success('Ингредиент успешно создан', { ingredient });
    } catch (e) {
      throw this.errorService.internal('Ошибка создания ингредиента', e.message);
    }
  }

  async update(id: string, dto: UpdateIngredientDto) {
    try {
      const ingredient = await this.ingredientRepository.update({ id }, dto);

      return this.errorService.success('Ингредиент успешно обновлён', { ingredient });
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления ингредиента', e.message);
    }
  }

  async remove(id: string) {
    try {
      await this.ingredientRepository.delete({ id });

      return this.errorService.success('Ингредиент успешно удалён');
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления ингредиента', e.message);
    }
  }
}
