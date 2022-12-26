import { CreateCategoryDto } from '@category/dto/create-category.dto';
import { GetAllQuery } from '@category/dto/get-all.query';
import { RemoveQuery } from '@category/dto/remove.query';
import { UpdateCategoryDto } from '@category/dto/update-category.dto';
import { CategoryEntity } from '@category/entity/category.entity';
import { ErrorService } from '@error/error.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly errorService: ErrorService,
  ) {}

  private readonly UNIQ_KEYS = ['article', 'code'];
  private readonly ERROR_TRANSLATES = {
    article: (value: string | number) => `артикулом - ${value}`,
    code: (value: string | number) => `кодом - ${value}`,
  };

  async all(query: GetAllQuery) {
    try {
      const whereExpression: FindManyOptions<CategoryEntity> = query.onlyHidden
        ? { where: { dateDeleted: Not(IsNull()) }, withDeleted: true }
        : { withDeleted: false };

      const categories = await this.categoryRepository.find(whereExpression);

      return this.errorService.success('Категории успешно получены', { categories });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения категорий', e.message);
    }
  }

  async byId(id: string) {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } });

      return this.errorService.success('Категория успешно получена', { category });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения категории', e.message);
    }
  }

  async create(dto: CreateCategoryDto) {
    try {
      const categoryEntity = this.categoryRepository.create(dto);

      await this.checkDuplicateAndThrow(categoryEntity);

      if (dto.hidden) {
        categoryEntity.dateDeleted = new Date();
      }

      const category = await this.categoryRepository.save(categoryEntity);

      return this.errorService.success('Категория успешно создана', { category });
    } catch (e) {
      throw this.errorService.internal('Ошибка создания категории', e.message);
    }
  }

  async update(id: string, dto: UpdateCategoryDto) {
    try {
      const categoryEntity = this.categoryRepository.create({ ...dto, id });

      await this.checkDuplicateAndThrow(categoryEntity);

      if (dto.hidden) {
        categoryEntity.dateDeleted = new Date();
      } else {
        categoryEntity.dateDeleted = null;
      }

      const category = await this.categoryRepository.update({ id }, categoryEntity);

      return this.errorService.success('Категория успешно обновлена', { category });
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления категории', e.message);
    }
  }

  async remove(id: string, query: RemoveQuery) {
    try {
      if (query.hard) {
        const category = await this.categoryRepository.delete({ id });
        return this.errorService.success('Категория успешно удалена', { category });
      }

      const category = await this.categoryRepository.update({ id }, { dateDeleted: new Date() });
      return this.errorService.success('Категория успешно скрыта', { category });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления категории', e.message);
    }
  }

  private async checkDuplicateAndThrow(dto: CategoryEntity) {
    for (const uniqKey of this.UNIQ_KEYS) {
      if (!dto[uniqKey]) {
        continue;
      }

      const expression: FindOptionsWhere<CategoryEntity> = { [uniqKey]: dto[uniqKey] };

      if (dto.id) {
        expression.id = Not(dto.id);
      }

      const categoryExists = await this.categoryRepository.findOne({
        where: expression,
        withDeleted: true,
      });

      if (categoryExists) {
        const translate: string = this.ERROR_TRANSLATES[uniqKey](dto[uniqKey]);

        throw new Error(`Категория с ${translate} уже существует`);
      }
    }
  }
}
