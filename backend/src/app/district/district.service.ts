import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Injectable()
export class DistrictService {
  async all() {
    return Promise.resolve(undefined);
  }

  async byId(id: string) {
    return Promise.resolve(undefined);
  }

  async create(dto: CreateDistrictDto) {
    return Promise.resolve(undefined);
  }

  async update(id: string, dto: UpdateDistrictDto) {
    return Promise.resolve(undefined);
  }

  async remove(id: string) {
    return Promise.resolve(undefined);
  }
}
