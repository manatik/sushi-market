import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '@role/entity/role.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ErrorService } from '@error/error.service';
import { CreateRoleDto } from '@role/dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly errorService: ErrorService,
  ) {}

  async all() {
    try {
      const roles = await this.roleRepository.find();

      return this.errorService.success('Роли успешно получены', { roles });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения ролей', e.message);
    }
  }

  async getBy(where: FindOptionsWhere<RoleEntity> | FindOptionsWhere<RoleEntity>[]) {
    try {
      const roles = await this.roleRepository.findBy(where);

      return this.errorService.success('Роли успешно получены', { roles });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения ролей', e.message);
    }
  }

  async create(dto: CreateRoleDto) {
    try {
      const duplicate = await this.roleRepository.findOneBy({ name: dto.name });

      if (duplicate) {
        throw this.errorService.badRequest(`Роль с именем ${dto.name} уже существует`);
      }

      const entity = this.roleRepository.create(dto);
      const role = await this.roleRepository.save(entity);
      return this.errorService.success('Роль успешно создана', { role });
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw this.errorService.internal('Ошибка создания роли', e.message);
    }
  }

  async remove(id: string) {
    try {
      const role = await this.roleRepository.delete({ id });

      return this.errorService.success('Роль успешно удалена', { role });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления роли', e.message);
    }
  }
}
