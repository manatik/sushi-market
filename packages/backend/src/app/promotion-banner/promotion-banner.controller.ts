import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { Public } from '@jwt-auth/decorators';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PromotionBannerService } from './promotion-banner.service';

@Controller(GLOBAL_PREFIXES.PROMOTION_BANNER)
export class PromotionBannerController {
  constructor(private readonly promotionService: PromotionBannerService) {}

  @Public()
  @Get(ENDPOINTS.PROMOTION_BANNER.ALL)
  async all() {
    return await this.promotionService.all();
  }

  @Public()
  @Post(ENDPOINTS.PROMOTION_BANNER.CREATE)
  async create(@Body() dto: CreatePromotionDto) {
    return await this.promotionService.create(dto);
  }

  @Patch(ENDPOINTS.PROMOTION_BANNER.UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdatePromotionDto) {
    return await this.promotionService.update(id, dto);
  }

  @Delete(ENDPOINTS.PROMOTION_BANNER.REMOVE)
  async remove(@Param('id') id: string) {
    return await this.promotionService.remove(id);
  }
}
