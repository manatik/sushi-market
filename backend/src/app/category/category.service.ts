import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '@category/dto/create-category.dto';
import { UpdateCategoryDto } from '@category/dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '@category/entity/category.entity';
import { Repository } from 'typeorm';
import { ErrorService } from '@error/error.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly errorService: ErrorService,
  ) {}

  async all() {
    try {
      const categories = await this.categoryRepository.find();

      return this.errorService.success('Категории успешно получены', { categories });
    } catch (e) {
      return this.errorService.internal('Ошибка получения категорий', e.message);
    }
  }

  async byId(id: string) {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } });

      return this.errorService.success('Категория успешно получена', { category });
    } catch (e) {
      return this.errorService.internal('Ошибка получения категории', e.message);
    }
  }

  async create(dto: CreateCategoryDto) {
    try {
      const categoryEntity = this.categoryRepository.create(dto);
      const category = await this.categoryRepository.save(categoryEntity);

      return this.errorService.success('Категория успешно создана', { category });
    } catch (e) {
      return this.errorService.internal('Ошибка создания категории', e.message);
    }
  }

  async update(id: string, dto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepository.update({ id }, dto);

      return this.errorService.success('Категория успешно обновлена', { category });
    } catch (e) {
      return this.errorService.internal('Ошибка обновления категории', e.message);
    }
  }

  async remove(id: string) {
    try {
      const category = await this.categoryRepository.delete({ id });

      return this.errorService.success('Категория успешно удалена', { category });
    } catch (e) {
      return this.errorService.internal('Ошибка удаления категории', e.message);
    }
  }
}
