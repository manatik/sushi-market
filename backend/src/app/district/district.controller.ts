import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { Public, Roles } from '@jwt-auth/decorators';
import { Role } from '@jwt-auth/enum';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { GetAllQuery } from './dto/get-all.query';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.DISTRICT)
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Public()
  @Get(ENDPOINTS.DEFAULT.ALL)
  async all(@Query() query: GetAllQuery) {
    return await this.districtService.all(query);
  }

  @Public()
  @Get(ENDPOINTS.DEFAULT.BY_ID)
  async byId(@Param('id') id: string) {
    return await this.districtService.byId(id);
  }

  @Post(ENDPOINTS.DEFAULT.CREATE)
  async create(@Body() dto: CreateDistrictDto) {
    return await this.districtService.create(dto);
  }

  @Patch(ENDPOINTS.DEFAULT.UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdateDistrictDto) {
    return await this.districtService.update(id, dto);
  }

  @Delete(ENDPOINTS.DEFAULT.REMOVE)
  async remove(@Param('id') id: string) {
    return await this.districtService.remove(id);
  }
}
