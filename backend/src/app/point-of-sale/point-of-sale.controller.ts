import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { Public, Roles } from '@jwt-auth/decorators';
import { Role } from '@jwt-auth/enum';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreatePointOfSaleDto } from './dto/create-point-of-sale.dto';
import { GetAllQuery } from './dto/get-all.query';
import { UpdatePointOfSaleDto } from './dto/update-point-of-sale.dto';
import { PointOfSaleService } from './point-of-sale.service';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.POINT_OF_SALE)
export class PointOfSaleController {
  constructor(private readonly pointOfSaleService: PointOfSaleService) {}

  @Public()
  @Get(ENDPOINTS.DEFAULT.ALL)
  async all(@Query() query: GetAllQuery) {
    return await this.pointOfSaleService.all(query);
  }

  @Public()
  @Get(ENDPOINTS.DEFAULT.BY_ID)
  async byId(@Param('id') id: string) {
    return await this.pointOfSaleService.byId(id);
  }

  @Post(ENDPOINTS.DEFAULT.CREATE)
  async create(@Body() dto: CreatePointOfSaleDto) {
    return await this.pointOfSaleService.create(dto);
  }

  @Patch(ENDPOINTS.DEFAULT.UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdatePointOfSaleDto) {
    return await this.pointOfSaleService.update(id, dto);
  }

  @Delete(ENDPOINTS.DEFAULT.REMOVE)
  async remove(@Param('id') id: string) {
    return await this.pointOfSaleService.remove(id);
  }
}
