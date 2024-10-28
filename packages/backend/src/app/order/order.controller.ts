import { User } from '@common-types/User.type';
import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { CurrentUser, Roles } from '@jwt-auth/decorators';
import { Role } from '@jwt-auth/enum';
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetAllQuery } from './dto/get-all.query';
import { OrderService } from './order.service';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.ORDER)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Roles(Role.User)
  @Get(ENDPOINTS.DEFAULT.ALL)
  async all(@CurrentUser() user: User, @Query() query: GetAllQuery) {
    return await this.orderService.all(query);
  }

  @Roles(Role.User)
  @Get(ENDPOINTS.DEFAULT.BY_ID)
  async byId(@CurrentUser() user: User, @Param('id') id: string) {
    return await this.orderService.byId(id);
  }

  @Roles(Role.User)
  @Post(ENDPOINTS.DEFAULT.CREATE)
  async create(@Body() dto: CreateOrderDto) {
    return await this.orderService.create(dto);
  }

  @Delete(ENDPOINTS.DEFAULT.REMOVE)
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(id);
  }
}
