import { CategoryService } from '@category/category.service';
import { CreateCategoryDto } from '@category/dto/create-category.dto';
import { GetAllQuery } from '@category/dto/get-all.query';
import { RemoveQuery } from '@category/dto/remove.query';
import { UpdateCategoryDto } from '@category/dto/update-category.dto';
import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { Public, Roles } from '@jwt-auth/decorators';
import { Role } from '@jwt-auth/enum';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.CATEGORY)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Get(ENDPOINTS.DEFAULT.ALL)
  async all(@Query() query: GetAllQuery) {
    return await this.categoryService.all(query);
  }

  @Public()
  @Get(ENDPOINTS.DEFAULT.BY_ID)
  async byId(@Param('id') id: string) {
    return await this.categoryService.byId(id);
  }

  @Post(ENDPOINTS.DEFAULT.CREATE)
  async create(@Body() dto: CreateCategoryDto) {
    return await this.categoryService.create(dto);
  }

  @Patch(ENDPOINTS.DEFAULT.UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return await this.categoryService.update(id, dto);
  }

  @Delete(ENDPOINTS.DEFAULT.REMOVE)
  async remove(@Param('id') id: string, @Query() query: RemoveQuery) {
    return await this.categoryService.remove(id, query);
  }
}
