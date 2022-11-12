import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { Public, Roles } from '@jwt-auth/decorators';
import { Role } from '@jwt-auth/enum';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSubCategoryDto } from '@sub-category/dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from '@sub-category/dto/update-sub-category.dto';
import { SubCategoryService } from '@sub-category/sub-category.service';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.SUB_CATEGORY)
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Public()
  @Get(ENDPOINTS.DEFAULT.ALL)
  async all() {
    return await this.subCategoryService.all();
  }

  @Public()
  @Get(ENDPOINTS.DEFAULT.BY_ID)
  async byId(@Param('id') id: string) {
    return await this.subCategoryService.byId(id);
  }

  @Post(ENDPOINTS.DEFAULT.CREATE)
  async create(@Body() dto: CreateSubCategoryDto) {
    return await this.subCategoryService.create(dto);
  }

  @Patch(ENDPOINTS.DEFAULT.UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdateSubCategoryDto) {
    return await this.subCategoryService.update(id, dto);
  }

  @Delete(ENDPOINTS.DEFAULT.REMOVE)
  async remove(@Param('id') id: string) {
    return await this.subCategoryService.remove(id);
  }
}
