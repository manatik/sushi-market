import { ErrorService } from '@error/error.service';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotosEntity } from '@photos/entity/photos.entity';
import { PhotosService } from '@photos/photos.service';
import { FileManipulatorSingleton } from '@utils/file-manipulator';
import { idsArrayToArrayOfObjects } from '@utils/utils';
import * as path from 'path';
import { FindOptionsWhere, ILike, IsNull, Not, Repository } from 'typeorm';
import * as uuid from 'uuid';
import { AddIngredientsDto } from './dto/add-ingredients.dto';
import { AddPhotosDto } from './dto/add-photos.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { GetAllQuery } from './dto/get-all.query';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    private readonly errorService: ErrorService,
    private readonly photosService: PhotosService,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  private readonly UNIQ_KEYS = ['article'];
  private readonly ERROR_TRANSLATES = {
    article: (value: string | number) => `артикулом - ${value}`,
  };

  async all(query: GetAllQuery) {
    try {
      const whereExpression: FindOptionsWhere<ProductEntity>[] = [
        { name: query.name ? ILike(`%${query.name}%`) : undefined, dateDeleted: IsNull() },
        { article: query.name ? ILike(`%${query.name}%`) : undefined, dateDeleted: IsNull() },
      ];

      for (const expression of whereExpression) {
        expression.categoryId = query.fc;
        expression.subCategoryId = query.fsc;
      }

      if (query.onlyHidden) {
        for (const expression of whereExpression) {
          expression.dateDeleted = Not(IsNull());
        }
      }

      const products = await this.productRepository.find({
        where: whereExpression,
        order: { orderBy: 'ASC' },
        relations: { category: true, subCategory: true, ingredients: true },
        withDeleted: true,
      });

      return this.errorService.success('Продукты успешно получены', { products });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения продуктов', e.message);
    }
  }

  async byId(id: string) {
    try {
      const product = await this.productRepository.findOne({ where: { id } });

      return this.errorService.success('Продукт успешно получен', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения продукта', e.message);
    }
  }

  async create(dto: CreateProductDto) {
    try {
      const productEntity = await this.productRepository.create(dto);

      await this.checkDuplicateAndThrow(productEntity);

      if (dto.hidden) {
        productEntity.dateDeleted = new Date();
      }

      const product = await this.productRepository.save(productEntity);

      return this.errorService.success('Продукт успешно создан', { product });
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw this.errorService.internal('Ошибка создания продукта', e.message);
    }
  }

  async update(id: string, dto: UpdateProductDto) {
    try {
      const productEntity = await this.productRepository.create({ ...dto, id });

      await this.checkDuplicateAndThrow(productEntity);

      if (dto.hidden) {
        productEntity.dateDeleted = new Date();
      } else {
        productEntity.dateDeleted = null;
      }

      const product = await this.productRepository.update({ id }, productEntity);

      return this.errorService.success('Продукт успешно обновлён', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления продукта', e.message);
    }
  }

  async remove(id: string) {
    try {
      const product = await this.productRepository.delete({ id });

      return this.errorService.success('Продукт успешно удалён', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления продукта', e.message);
    }
  }

  async addPhotos(id: string, photos: Array<Express.Multer.File>, dto: AddPhotosDto) {
    const wroteFiles = [];

    const createdPhotos: PhotosEntity[] = [];
    try {
      for await (const photo of photos) {
        const filename = uuid.v4() + path.extname(photo.originalname);

        const result = await FileManipulatorSingleton.writeWithCompress(filename, photo.buffer, {
          quality: dto.quality,
        });

        wroteFiles.push(result.data.path);

        const createdPhoto = await this.photosService.create({
          name: dto.name,
          path: result.data.path,
          description: dto.description,
          filename: result.data.filename,
          size: photo.size,
          originalFilename: photo.originalname,
        });

        createdPhotos.push(createdPhoto);
      }

      const product = await this.productRepository.findOne({ where: { id }, relations: { photos: true } });
      await this.productRepository.save({ ...product, photos: createdPhotos.concat(product.photos) });

      return this.errorService.success('Фото успешно добавлены');
    } catch (e) {
      await FileManipulatorSingleton.removeFiles(wroteFiles);
      throw this.errorService.internal('Ошибка добавления фото', e.message);
    }
  }

  async removePhoto(id: string, photoId: string) {
    try {
      const product = await this.productRepository.findOne({ where: { id }, relations: { photos: true } });
      const photo = product.photos.find((photo) => photo.id === photoId);

      if (!photo) {
        throw new Error('Фото для удаления не найдено или не существует');
      }

      await this.productRepository.save({ ...product, photos: product.photos.filter((photo) => photo.id !== photoId) });
      await this.photosService.remove(photoId);
      await FileManipulatorSingleton.removeFiles([photo.path]);

      return this.errorService.success('Фото успешно удалено');
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления фото', e.message);
    }
  }

  private async checkDuplicateAndThrow(dto: ProductEntity) {
    for (const uniqKey of this.UNIQ_KEYS) {
      if (!dto[uniqKey]) {
        continue;
      }

      const expression: FindOptionsWhere<ProductEntity> = { [uniqKey]: dto[uniqKey] };

      if (dto.id) {
        expression.id = Not(dto.id);
      }

      const productExists = await this.productRepository.findOne({
        where: expression,
        withDeleted: true,
      });

      if (productExists) {
        const translate: string = this.ERROR_TRANSLATES[uniqKey](dto[uniqKey]);

        throw new Error(`Продукт с ${translate} уже существует`);
      }
    }
  }

  async addIngredients(id: string, dto: AddIngredientsDto) {
    try {
      const product = await this.productRepository.findOne({ where: { id }, relations: { ingredients: true } });

      await this.productRepository.save({ ...product, ingredients: idsArrayToArrayOfObjects(dto.ingredients) });

      return this.errorService.success('Ингредиенты добавлены');
    } catch (e) {
      throw this.errorService.internal('Ошибка добавления ингредиентов', e.message);
    }
  }

  async removeIngredient(id: string, ingredientId: string) {
    try {
      const product = await this.productRepository.findOne({ where: { id }, relations: { ingredients: true } });

      await this.productRepository.save({
        ...product,
        ingredients: product.ingredients.filter((ingredient) => ingredient.id !== ingredientId),
      });

      return this.errorService.success('Ингредиент успешно удалён');
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления ингредиента', e.message);
    }
  }
}
