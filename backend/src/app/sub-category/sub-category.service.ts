import { ErrorService } from '@error/error.service';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubCategoryDto } from '@sub-category/dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from '@sub-category/dto/update-sub-category.dto';
import { SubCategoryEntity } from '@sub-category/entity/sub-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubCategoryService {
  constructor(
    private readonly errorService: ErrorService,
    @InjectRepository(SubCategoryEntity)
    private readonly subCategoryRepository: Repository<SubCategoryEntity>,
  ) {}

  async all() {
    try {
      const subCategories = await this.subCategoryRepository.find({ relations: { category: true } });

      return this.errorService.success('Подкатегории успешно получены', { subCategories });
    } catch (e) {
      return this.errorService.internal('Ошибка получения подкатегорий', e.message);
    }
  }

  async byId(id: string) {
    try {
      const subCategory = await this.subCategoryRepository.findOneBy({ id });

      return this.errorService.success('Подкатегория получена', { subCategory });
    } catch (e) {
      return this.errorService.internal('Ошибка получения подкатегории', e.message);
    }
  }

  async create(dto: CreateSubCategoryDto) {
    try {
      const found = await this.subCategoryRepository.findOne({ where: { article: dto.article } });

      if (found) {
        throw this.errorService.badRequest(`Подкатегория с артикулом - ${dto.article} уже существует`);
      }

      const entity = this.subCategoryRepository.create(dto);
      const subCategory = await this.subCategoryRepository.save(entity);

      return this.errorService.success('Подкатегория создана', { subCategory });
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      return this.errorService.internal('Ошибка сохранения подкатегории', e.message);
    }
  }

  async update(id: string, dto: UpdateSubCategoryDto) {
    try {
      const subCategory = await this.subCategoryRepository.update({ id }, dto);

      return this.errorService.success('Подкатегория обновлена', { subCategory });
    } catch (e) {
      return this.errorService.internal('Ошибка обновления подкатегории', e.message);
    }
  }

  async remove(id: string) {
    try {
      const subCategory = await this.subCategoryRepository.delete({ id });

      return this.errorService.success('Подкатегория удалена', { subCategory });
    } catch (e) {
      return this.errorService.internal('Ошибка удаления подкатегории', e.message);
    }
  }
}
