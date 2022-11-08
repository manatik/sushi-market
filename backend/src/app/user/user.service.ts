import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@user/enitity/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ErrorService } from '@error/error.service';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { UpdateUserDto } from '@user/dto/update-user.dto';
import { idsArrayToArrayOfObjects } from '@utils/utils';
import { FindParams } from '@user/user.types';
import { CreateAddressDto } from '@user/dto/create-address.dto';
import { AddressEntity } from '@user/enitity/address.entity';
import { UpdateAddressDto } from '@user/dto/update-address.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly errorService: ErrorService,
  ) {}

  async all() {
    try {
      const users = await this.userRepository.find({ relations: { addresses: true } });

      return this.errorService.success('Пользователи успешно получены', { users });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения пользователей', e.message);
    }
  }

  async getBy(
    where: FindOptionsWhere<UserEntity>,
    { withPassword, withRoles }: FindParams = { withPassword: false, withRoles: false },
  ) {
    try {
      const user = await this.userRepository.findOne({
        where,
        relations: {
          roles: withRoles,
          addresses: true,
        },
        select: {
          id: true,
          password: withPassword,
          phone: true,
          email: true,
          dateDeleted: true,
          birthdate: true,
          dateCreated: true,
          dateUpdated: true,
          firstname: true,
          lastname: true,
          activeAddressId: true,
        },
      });

      return this.errorService.success('Пользователь успешно получен', { user });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения пользователя', e.message);
    }
  }

  async create(dto: CreateUserDto) {
    try {
      if (dto.email) {
        const duplicate = await this.userRepository.findOneBy({ email: dto.email });

        if (duplicate) {
          throw this.errorService.badRequest(`E-mail ${dto.email} уже занят`);
        }
      }

      const duplicate = await this.userRepository.findOneBy({ phone: dto.phone });

      if (duplicate) {
        throw this.errorService.badRequest(`Номер телефона ${dto.phone} уже занят`);
      }

      const entity = this.userRepository.create(dto);
      const user = await this.userRepository.save(entity);

      return this.errorService.success('Пользователь успешно создан', { user });
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw this.errorService.internal('Ошибка создания пользователя', e.message);
    }
  }

  async update(id: string, dto: UpdateUserDto) {
    try {
      const user = await this.userRepository.save({ id, ...dto, roles: idsArrayToArrayOfObjects(dto.roles) });
      return this.errorService.success('Пользователь успешно обновлён', { user });
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления пользователя', e.message);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userRepository.delete({ id });

      return this.errorService.success('Пользователь успешно удалён', { user });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления пользователя', e.message);
    }
  }

  async addAddress(userId: string, dto: CreateAddressDto) {
    try {
      const addressEntity = this.addressRepository.create({ userId, ...dto });
      await this.addressRepository.save(addressEntity);

      return this.errorService.success('Адрес успешно добавлен', { address: addressEntity });
    } catch (e) {
      throw this.errorService.internal('Ошибка создания адреса', e.message);
    }
  }

  async setActiveAddress(userId, dto) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      user.activeAddressId = dto.id;
      await this.userRepository.save(user);

      return this.errorService.success('Адрес успешно присвоен');
    } catch (e) {
      throw this.errorService.internal('Ошибка присвоения адреса', e.message);
    }
  }

  async updateAddress(userId: string, addressId: string, dto: UpdateAddressDto) {
    try {
      const address = await this.addressRepository.findOne({ where: { id: addressId, userId } });
      const entity = this.addressRepository.create({ ...address, ...dto });
      await this.addressRepository.save(entity);

      return this.errorService.success('Адрес успешно обновлён');
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления адреса', e.message);
    }
  }

  async removeAddress(userId: string, addressId: string) {
    try {
      const address = await this.addressRepository.delete({ userId, id: addressId });

      return this.errorService.success('Адрес успешно удалён', { address });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления адреса', e.message);
    }
  }
}
