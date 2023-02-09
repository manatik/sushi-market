import { GetAllQuery } from '@district/dto/get-all.query';
import { DistrictEntity } from '@district/entity/district.entity';
import { ErrorService } from '@error/error.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, IsNull, Not, Repository } from 'typeorm';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(DistrictEntity)
    private readonly districtRepository: Repository<DistrictEntity>,
    private readonly errorService: ErrorService,
  ) {}

  private readonly UNIQ_KEYS = ['name'];
  private readonly ERROR_TRANSLATES = {
    name: (value: string | number) => `названием - ${value}`,
  };

  async all(query: GetAllQuery) {
    try {
      const whereExpression: FindOptionsWhere<DistrictEntity>[] = [
        { name: query.name ? ILike(`%${query.name}%`) : undefined, dateDeleted: IsNull() },
      ];

      const districts = await this.districtRepository.find({
        where: whereExpression,
      });

      return this.errorService.success('Районы успешно получены', { districts });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения районов', e.message);
    }
  }

  async byId(id: string) {
    try {
      const district = await this.districtRepository.findOne({ where: { id } });

      return this.errorService.success('Район успешно получен', { district });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения района', e.message);
    }
  }

  async create(dto: CreateDistrictDto) {
    try {
      const districtEntity = this.districtRepository.create(dto);

      await this.checkDuplicateAndThrow(districtEntity);

      const district = await this.districtRepository.save(districtEntity);

      return this.errorService.success('Район успешно создан', { district });
    } catch (e) {
      throw this.errorService.internal('Ошибка создания района', e.message);
    }
  }

  async update(id: string, dto: UpdateDistrictDto) {
    try {
      const districtEntity = this.districtRepository.create({ ...dto, id });

      await this.checkDuplicateAndThrow(districtEntity);

      const district = await this.districtRepository.update({ id }, districtEntity);

      return this.errorService.success('Район успешно обновлен', { district });
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления Района', e.message);
    }
  }

  async remove(id: string) {
    try {
      const district = await this.districtRepository.delete({ id });
      return this.errorService.success('Район успешно удален', { district });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления района', e.message);
    }
  }

  private async checkDuplicateAndThrow(dto: DistrictEntity) {
    for (const uniqKey of this.UNIQ_KEYS) {
      if (!dto[uniqKey]) {
        continue;
      }

      const expression: FindOptionsWhere<DistrictEntity> = { [uniqKey]: dto[uniqKey] };

      if (dto.id) {
        expression.id = Not(dto.id);
      }

      const districtExists = await this.districtRepository.findOne({
        where: expression,
        withDeleted: true,
      });

      if (districtExists) {
        const translate: string = this.ERROR_TRANSLATES[uniqKey](dto[uniqKey]);

        throw new Error(`Район с ${translate} уже существует`);
      }
    }
  }
}
