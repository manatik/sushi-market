import { Injectable } from '@nestjs/common';
import { CreatePointOfSaleDto } from './dto/create-point-of-sale.dto';
import { UpdatePointOfSaleDto } from './dto/update-point-of-sale.dto';

@Injectable()
export class PointOfSaleService {
  async all() {
    return Promise.resolve(undefined);
  }

  async byId(id: string) {
    return Promise.resolve(undefined);
  }

  async create(dto: CreatePointOfSaleDto) {
    return Promise.resolve(undefined);
  }

  async update(id: string, dto: UpdatePointOfSaleDto) {
    return Promise.resolve(undefined);
  }

  async remove(id: string) {
    return Promise.resolve(undefined);
  }
}
