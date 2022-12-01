import { ErrorService } from '@error/error.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotosEntity } from '@photos/entity/photos.entity';
import { PhotosService } from '@photos/photos.service';
import { AddPhotosDto } from '@product/dto/add-photos.dto';
import { CreateProductDto } from '@product/dto/create-product.dto';
import { GetAllQuery } from '@product/dto/get-all.query';
import { UpdateProductDto } from '@product/dto/update-product.dto';
import { ProductEntity } from '@product/entity/product.entity';
import { FileManipulatorSingleton } from '@utils/file-manipulator';
import * as path from 'path';
import { FindManyOptions, Not, Repository } from 'typeorm';
import * as uuid from 'uuid';

@Injectable()
export class ProductService {
  constructor(
    private readonly errorService: ErrorService,
    private readonly photosService: PhotosService,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async all(query: GetAllQuery) {
    try {
      let whereExpression: FindManyOptions<ProductEntity> | undefined;

      if (!query.withHidden) {
        whereExpression = { where: { hidden: false } };
      }

      const products = await this.productRepository.find(whereExpression);

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
      const productExists = await this.productRepository.findOne({ where: { article: dto.article } });

      if (productExists) {
        throw new Error(`Продукт с артикулом ${dto.article} уже существует`);
      }

      const productEntity = await this.productRepository.create(dto);
      const product = await this.productRepository.save(productEntity);

      return this.errorService.success('Продукт успешно создан', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка создания продукта', e.message);
    }
  }

  async update(id: string, dto: UpdateProductDto) {
    try {
      const productExists = await this.productRepository.findOne({ where: { article: dto.article, id: Not(id) } });

      if (productExists) {
        throw new Error(`Продукт с артикулом ${dto.article} уже существует`);
      }

      const productEntity = await this.productRepository.create(dto);
      const product = await this.productRepository.update({ id }, productEntity);

      return this.errorService.success('Продукт успешно создан', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка создания продукта', e.message);
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
}
