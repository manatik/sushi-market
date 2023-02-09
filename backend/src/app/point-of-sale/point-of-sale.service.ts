import { ErrorService } from '@error/error.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetAllQuery } from '@point-of-sale/dto/get-all.query';
import { PointOfSaleEntity } from '@point-of-sale/entity/point-of-sale.entity';
import { FindOptionsWhere, ILike, IsNull, Not, Repository } from 'typeorm';
import { CreatePointOfSaleDto } from './dto/create-point-of-sale.dto';
import { UpdatePointOfSaleDto } from './dto/update-point-of-sale.dto';

@Injectable()
export class PointOfSaleService {
  constructor(
    @InjectRepository(PointOfSaleEntity)
    private readonly pointOfSaleRepository: Repository<PointOfSaleEntity>,
    private readonly errorService: ErrorService,
  ) {}

  private readonly UNIQ_KEYS = ['addressPointSale'];
  private readonly ERROR_TRANSLATES = {
    name: (value: string | number) => `адресом - ${value}`,
  };

  async all(query: GetAllQuery) {
    try {
      const whereExpression: FindOptionsWhere<PointOfSaleEntity>[] = [
        { addressPointSale: query.address ? ILike(`%${query.address}%`) : undefined, dateDeleted: IsNull() },
      ];

      const pointsOfSale = await this.pointOfSaleRepository.find({
        where: whereExpression,
      });

      return this.errorService.success('Точки продаж успешно получены', { pointsOfSale });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения точек продаж', e.message);
    }
  }

  async byId(id: string) {
    try {
      const pointOfSale = await this.pointOfSaleRepository.findOne({ where: { id } });

      return this.errorService.success('Точка продаж успешно получена', { pointOfSale });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения точки продаж', e.message);
    }
  }

  async create(dto: CreatePointOfSaleDto) {
    try {
      const pointOfSaleEntity = this.pointOfSaleRepository.create(dto);

      await this.checkDuplicateAndThrow(pointOfSaleEntity);

      const pointOfSale = await this.pointOfSaleRepository.save(pointOfSaleEntity);

      return this.errorService.success('Точка продаж успешно создана', { pointOfSale });
    } catch (e) {
      throw this.errorService.internal('Ошибка создания точки продаж', e.message);
    }
  }

  async update(id: string, dto: UpdatePointOfSaleDto) {
    try {
      const pointOfSaleEntity = this.pointOfSaleRepository.create({ ...dto, id });

      await this.checkDuplicateAndThrow(pointOfSaleEntity);

      const pointOfSale = await this.pointOfSaleRepository.update({ id }, pointOfSaleEntity);

      return this.errorService.success('Точка продаж успешно обновлена', { pointOfSale });
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления точки продаж', e.message);
    }
  }

  async remove(id: string) {
    try {
      const pointOfSale = await this.pointOfSaleRepository.delete({ id });
      return this.errorService.success('Точка продаж успешно удалена', { pointOfSale });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления точки продаж', e.message);
    }
  }

  private async checkDuplicateAndThrow(dto: PointOfSaleEntity) {
    for (const uniqKey of this.UNIQ_KEYS) {
      if (!dto[uniqKey]) {
        continue;
      }

      const expression: FindOptionsWhere<PointOfSaleEntity> = { [uniqKey]: dto[uniqKey] };

      if (dto.id) {
        expression.id = Not(dto.id);
      }

      const pointOfSaleExists = await this.pointOfSaleRepository.findOne({
        where: expression,
        withDeleted: true,
      });

      if (pointOfSaleExists) {
        const translate: string = this.ERROR_TRANSLATES[uniqKey](dto[uniqKey]);

        throw new Error(`Точка продаж с ${translate} уже существует`);
      }
    }
  }
}
