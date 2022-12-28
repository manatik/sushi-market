import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { CreateIngredientDto } from '@ingredient/dto/create-ingredient.dto';
import { GetAllQuery } from '@ingredient/dto/get-all.query';
import { UpdateIngredientDto } from '@ingredient/dto/update-ingredient.dto';
import { IngredientService } from '@ingredient/ingredient.service';
import { Public, Roles } from '@jwt-auth/decorators';
import { Role } from '@jwt-auth/enum';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.INGREDIENT)
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Public()
  @Get(ENDPOINTS.DEFAULT.ALL)
  async all(@Query() query: GetAllQuery) {
    return await this.ingredientService.all(query);
  }

  @Public()
  @Get(ENDPOINTS.DEFAULT.BY_ID)
  async byId(@Param('id') id: string) {
    return await this.ingredientService.byId(id);
  }

  @Post(ENDPOINTS.DEFAULT.CREATE)
  async create(@Body() dto: CreateIngredientDto) {
    return await this.ingredientService.create(dto);
  }

  @Patch(ENDPOINTS.DEFAULT.UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdateIngredientDto) {
    return await this.ingredientService.update(id, dto);
  }

  @Delete(ENDPOINTS.DEFAULT.REMOVE)
  async remove(@Param('id') id: string) {
    return await this.ingredientService.remove(id);
  }
}
