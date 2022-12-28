import { ErrorService } from '@error/error.service';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubCategoryDto } from '@sub-category/dto/create-sub-category.dto';
import { GetAllQuery } from '@sub-category/dto/get-all.query';
import { UpdateSubCategoryDto } from '@sub-category/dto/update-sub-category.dto';
import { SubCategoryEntity } from '@sub-category/entity/sub-category.entity';
import { FindOptionsWhere, ILike, IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class SubCategoryService {
  constructor(
    private readonly errorService: ErrorService,
    @InjectRepository(SubCategoryEntity)
    private readonly subCategoryRepository: Repository<SubCategoryEntity>,
  ) {}

  private readonly UNIQ_KEYS = ['article'];
  private readonly ERROR_TRANSLATES = {
    article: (value: string | number) => `артикулом - ${value}`,
  };

  async all(query: GetAllQuery) {
    try {
      const whereExpression: FindOptionsWhere<SubCategoryEntity>[] = [
        { name: query.name ? ILike(`%${query.name}%`) : undefined, dateDeleted: IsNull() },
        { article: query.name ? ILike(`%${query.name}%`) : undefined, dateDeleted: IsNull() },
      ];

      for (const expression of whereExpression) {
        expression.categoryId = query.fc;
      }

      if (query.onlyHidden) {
        for (const expression of whereExpression) {
          expression.dateDeleted = Not(IsNull());
        }
      }

      const subCategories = await this.subCategoryRepository.find({
        where: whereExpression,
        relations: { category: true },
        withDeleted: true,
      });

      return this.errorService.success('Подкатегории успешно получены', { subCategories });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения подкатегорий', e.message);
    }
  }

  async byId(id: string) {
    try {
      const subCategory = await this.subCategoryRepository.findOneBy({ id });

      return this.errorService.success('Подкатегория получена', { subCategory });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения подкатегории', e.message);
    }
  }

  async create(dto: CreateSubCategoryDto) {
    try {
      const subCategoryEntity = this.subCategoryRepository.create(dto);

      await this.checkDuplicateAndThrow(subCategoryEntity);

      if (dto.hidden) {
        subCategoryEntity.dateDeleted = new Date();
      }

      const subCategory = await this.subCategoryRepository.save(subCategoryEntity);

      return this.errorService.success('Подкатегория создана', { subCategory });
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw this.errorService.internal('Ошибка сохранения подкатегории', e.message);
    }
  }

  async update(id: string, dto: UpdateSubCategoryDto) {
    try {
      const subCategoryEntity = this.subCategoryRepository.create({ ...dto, id });

      await this.checkDuplicateAndThrow(subCategoryEntity);

      if (dto.hidden) {
        subCategoryEntity.dateDeleted = new Date();
      } else {
        subCategoryEntity.dateDeleted = null;
      }

      const subCategory = await this.subCategoryRepository.update({ id }, subCategoryEntity);

      return this.errorService.success('Подкатегория обновлена', { subCategory });
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления подкатегории', e.message);
    }
  }

  async remove(id: string) {
    try {
      const subCategory = await this.subCategoryRepository.delete({ id });

      return this.errorService.success('Подкатегория удалена', { subCategory });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления подкатегории', e.message);
    }
  }

  private async checkDuplicateAndThrow(dto: SubCategoryEntity) {
    for (const uniqKey of this.UNIQ_KEYS) {
      const expression: FindOptionsWhere<SubCategoryEntity> = { [uniqKey]: dto[uniqKey] };

      if (dto.id) {
        expression.id = Not(dto.id);
      }

      if (!expression) {
        continue;
      }

      const subCategoryExists = await this.subCategoryRepository.findOne({
        where: expression,
        withDeleted: true,
      });

      if (subCategoryExists) {
        const translate: string = this.ERROR_TRANSLATES[uniqKey](dto[uniqKey]);

        throw new Error(`Подкатегория с ${translate} уже существует`);
      }
    }
  }
}
