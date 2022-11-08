import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { CategoryService } from '@category/category.service';
import { CreateCategoryDto } from '@category/dto/create-category.dto';
import { UpdateCategoryDto } from '@category/dto/update-category.dto';

@Controller(GLOBAL_PREFIXES.CATEGORY)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(ENDPOINTS.DEFAULT.ALL)
  async all() {
    return await this.categoryService.all();
  }

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
  async remove(@Param('id') id: string) {
    return await this.categoryService.remove(id);
  }
}
