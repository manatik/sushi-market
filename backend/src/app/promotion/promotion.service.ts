import { ErrorService } from '@error/error.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotosEntity } from '@photos/entity/photos.entity';
import { PhotosService } from '@photos/photos.service';
import { FileManipulatorSingleton } from '@utils/file-manipulator';
import { idsArrayToArrayOfObjects } from '@utils/utils';
import * as path from 'path';
import { FindOptionsWhere, ILike, IsNull, Not, Repository } from 'typeorm';
import * as uuid from 'uuid';
import { AddPhotosDto } from './dto/add-photos.dto';
import { AddProductsDto } from './dto/add-products.dto';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { GetAllQuery } from './dto/get-all.query';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PromotionEntity } from './entity/promotion.entity';

@Injectable()
export class PromotionService {
  constructor(
    private readonly errorService: ErrorService,
    private readonly photosService: PhotosService,
    @InjectRepository(PromotionEntity)
    private readonly promotionRepository: Repository<PromotionEntity>,
  ) {}

  private readonly UNIQ_KEYS = ['article', 'name', 'promocode'];
  private readonly ERROR_TRANSLATES = {
    article: (value: string | number) => `артикулом - ${value}`,
    name: (value: string | number) => `названием - ${value}`,
    promocode: (value: string | number) => `промокодом - ${value}`,
  };

  async all(query: GetAllQuery) {
    try {
      const whereExpression: FindOptionsWhere<PromotionEntity>[] = [
        { name: query.name ? ILike(`%${query.name}%`) : undefined, dateDeleted: IsNull(), typePromotion: undefined },
        { article: query.name ? ILike(`%${query.name}%`) : undefined, dateDeleted: IsNull(), typePromotion: undefined },
        {
          promocode: query.name ? ILike(`%${query.name}%`) : undefined,
          dateDeleted: IsNull(),
          typePromotion: undefined,
        },
      ];

      if (query.onlyHidden) {
        for (const expression of whereExpression) {
          expression.dateDeleted = Not(IsNull());
        }
      }

      if (query.promotionType) {
        for (const expression of whereExpression) {
          expression.typePromotion = query.promotionType;
        }
      }

      const promotions = await this.promotionRepository.find({
        where: whereExpression,
        relations: { products: true, photos: true },
        withDeleted: true,
      });

      return this.errorService.success('Акции успешно получены', { promotions });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения акций', e.message);
    }
  }

  async byId(id: string) {
    try {
      const promotion = await this.promotionRepository.findOne({ where: { id } });

      return this.errorService.success('Акция успешно получена', { promotion });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения акции', e.message);
    }
  }

  async create(dto: CreatePromotionDto) {
    try {
      if (!dto.promocode) {
        dto.promocode = null;
      }

      const promotionEntity = this.promotionRepository.create(dto);

      await this.checkDuplicateAndThrow(promotionEntity);

      if (dto.hidden) {
        promotionEntity.dateDeleted = new Date();
      }

      const promotion = await this.promotionRepository.save(promotionEntity);

      return this.errorService.success('Акция успешно создана', { promotion: promotion });
    } catch (e) {
      throw this.errorService.internal('Ошибка создания акции', e.message);
    }
  }

  async update(id: string, dto: UpdatePromotionDto) {
    try {
      const promotionEntity = await this.promotionRepository.create({ ...dto, id });

      await this.checkDuplicateAndThrow(promotionEntity);

      if (dto.hidden) {
        promotionEntity.dateDeleted = new Date();
      } else {
        promotionEntity.dateDeleted = null;
      }

      const promotion = await this.promotionRepository.update({ id }, promotionEntity);

      return this.errorService.success('Акция успешно создана', { promotion });
    } catch (e) {
      throw this.errorService.internal('Ошибка создания акции', e.message);
    }
  }

  async remove(id: string) {
    try {
      const promotion = await this.promotionRepository.delete({ id });

      return this.errorService.success('Акция успешно удалена', { promotion });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления акции', e.message);
    }
  }

  async addPhotos(id: string, photos: Array<Express.Multer.File>, dto: AddPhotosDto) {
    const wroteFiles = [];

    const createdPhotos: PhotosEntity[] = [];
    try {
      for (const photo of photos) {
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

      const promotion = await this.promotionRepository.findOne({ where: { id }, relations: { photos: true } });
      await this.promotionRepository.save({ ...promotion, photos: createdPhotos.concat(promotion.photos) });

      return this.errorService.success('Фото успешно добавлены');
    } catch (e) {
      await FileManipulatorSingleton.removeFiles(wroteFiles);
      throw this.errorService.internal('Ошибка добавления фото', e.message);
    }
  }

  async removePhoto(id: string, photoId: string) {
    try {
      const promotion = await this.promotionRepository.findOne({ where: { id }, relations: { photos: true } });
      const photo = promotion.photos.find((photo) => photo.id === photoId);

      if (!photo) {
        throw new Error('Фото для удаления не найдено или не существует');
      }

      await this.promotionRepository.save({
        ...promotion,
        photos: promotion.photos.filter((photo) => photo.id !== photoId),
      });

      await this.photosService.remove(photoId);

      await FileManipulatorSingleton.removeFiles([photo.path]);

      return this.errorService.success('Фото успешно удалено');
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления фото', e.message);
    }
  }

  async addProducts(id: string, dto: AddProductsDto) {
    try {
      const product = await this.promotionRepository.findOne({ where: { id }, relations: { products: true } });

      await this.promotionRepository.save({ ...product, products: idsArrayToArrayOfObjects(dto.products) });

      return this.errorService.success('Продукты добавлены');
    } catch (e) {
      throw this.errorService.internal('Ошибка добавления продукты', e.message);
    }
  }

  async removeProduct(id: string, productId: string) {
    try {
      const product = await this.promotionRepository.findOne({ where: { id }, relations: { products: true } });

      await this.promotionRepository.save({
        ...product,
        ingredients: product.products.filter((ingredient) => ingredient.id !== productId),
      });

      return this.errorService.success('Продукт успешно удалён');
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления продукта', e.message);
    }
  }

  private async checkDuplicateAndThrow(dto: PromotionEntity) {
    for (const uniqKey of this.UNIQ_KEYS) {
      if (!dto[uniqKey]) {
        continue;
      }

      const expression: FindOptionsWhere<PromotionEntity> = { [uniqKey]: dto[uniqKey] };

      if (dto.id) {
        expression.id = Not(dto.id);
      }

      const promotionExists = await this.promotionRepository.findOne({
        where: expression,
        withDeleted: true,
      });

      if (promotionExists) {
        const translate: string = this.ERROR_TRANSLATES[uniqKey](dto[uniqKey]);

        throw new Error(`Акция с ${translate} уже существует`);
      }
    }
  }
}
