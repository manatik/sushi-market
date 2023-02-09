import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetAllQuery } from './dto/get-all.query';

@Injectable()
export class OrderService {
  async all(query: GetAllQuery) {
    return Promise.resolve(undefined);
  }

  async byId(id: string) {
    return Promise.resolve(undefined);
  }

  async create(dto: CreateOrderDto) {
    return Promise.resolve(undefined);
  }

  async remove(id: string) {
    return Promise.resolve(undefined);
  }
}
