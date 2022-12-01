import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { CreateIngredientDto } from '@ingredient/dto/create-ingredient.dto';
import { UpdateIngredientDto } from '@ingredient/dto/update-ingredient.dto';
import { IngredientService } from '@ingredient/ingredient.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller(GLOBAL_PREFIXES.INGREDIENT)
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get(ENDPOINTS.DEFAULT.ALL)
  async all() {
    return await this.ingredientService.all();
  }

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
