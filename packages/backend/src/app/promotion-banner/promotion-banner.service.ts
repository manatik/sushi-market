import { ErrorService } from '@error/error.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Not, Repository } from 'typeorm';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PromotionBannerEntity } from './entity/promotion-banner.entity';

@Injectable()
export class PromotionBannerService {
  constructor(
    private readonly errorService: ErrorService,
    @InjectRepository(PromotionBannerEntity)
    private readonly promotionBannerRepository: Repository<PromotionBannerEntity>,
  ) {}

  private readonly UNIQ_KEYS = ['promotionId'];
  private readonly ERROR_TRANSLATES = {
    promotionId: (value: string | number) => `id - ${value}`,
  };

  async all() {
    try {
      const banners = await this.promotionBannerRepository.find({
        relations: { promotion: true },
      });

      return this.errorService.success('Акции успешно получены', { banners });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения акций', e.message);
    }
  }

  async create(dto: CreatePromotionDto) {
    try {
      const bannerEntity = this.promotionBannerRepository.create(dto);

      await this.checkDuplicateAndThrow(bannerEntity);

      const banner = await this.promotionBannerRepository.save(bannerEntity);

      return this.errorService.success('Акция успешно создана', { banner });
    } catch (e) {
      throw this.errorService.internal('Ошибка создания акции', e.message);
    }
  }

  async update(id: string, dto: UpdatePromotionDto) {
    try {
      const bannerEntity = await this.promotionBannerRepository.create({ ...dto, id });

      await this.checkDuplicateAndThrow(bannerEntity);

      const banner = await this.promotionBannerRepository.update({ id }, bannerEntity);

      return this.errorService.success('Акция успешно создана', { banner });
    } catch (e) {
      throw this.errorService.internal('Ошибка создания акции', e.message);
    }
  }

  async remove(id: string) {
    try {
      const banner = await this.promotionBannerRepository.delete({ id });

      return this.errorService.success('Акция успешно удалена', { banner });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления акции', e.message);
    }
  }

  private async checkDuplicateAndThrow(dto: PromotionBannerEntity) {
    for (const uniqKey of this.UNIQ_KEYS) {
      if (!dto[uniqKey]) {
        continue;
      }

      const expression: FindOptionsWhere<PromotionBannerEntity> = { [uniqKey]: dto[uniqKey] };

      if (dto.id) {
        expression.id = Not(dto.id);
      }

      const promotionExists = await this.promotionBannerRepository.findOne({
        where: expression,
      });

      if (promotionExists) {
        const translate: string = this.ERROR_TRANSLATES[uniqKey](dto[uniqKey]);

        throw new Error(`Акция с ${translate} уже существует`);
      }
    }
  }
}
