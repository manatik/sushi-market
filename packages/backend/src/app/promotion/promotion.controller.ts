import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { Public } from '@jwt-auth/decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AddPhotosDto } from './dto/add-photos.dto';
import { AddProductsDto } from './dto/add-products.dto';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { GetAllQuery } from './dto/get-all.query';
import { RemovePromotionPhotoQuery } from './dto/remove-promotion-photo.query';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PromotionService } from './promotion.service';

@Controller(GLOBAL_PREFIXES.PROMOTION)
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Public()
  @Get(ENDPOINTS.PROMOTION.ALL)
  async all(@Query() query: GetAllQuery) {
    return await this.promotionService.all(query);
  }

  @Public()
  @Get(ENDPOINTS.PROMOTION.BY_ID)
  async byId(@Param('id') id: string) {
    return await this.promotionService.byId(id);
  }

  @Public()
  @Post(ENDPOINTS.PROMOTION.CREATE)
  async create(@Body() dto: CreatePromotionDto) {
    return await this.promotionService.create(dto);
  }

  @UseInterceptors(FilesInterceptor('photos'))
  @Post(ENDPOINTS.PROMOTION.ADD_PHOTOS)
  async addPhotos(
    @Param('id') id: string,
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @Body() dto: AddPhotosDto,
  ) {
    return await this.promotionService.addPhotos(id, photos, dto);
  }

  @Post(ENDPOINTS.PROMOTION.ADD_PRODUCTS)
  async addProducts(@Param('id') id: string, @Body() dto: AddProductsDto) {
    return await this.promotionService.addProducts(id, dto);
  }

  @Patch(ENDPOINTS.PROMOTION.UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdatePromotionDto) {
    return await this.promotionService.update(id, dto);
  }

  @Delete(ENDPOINTS.PROMOTION.REMOVE)
  async remove(@Param('id') id: string) {
    return await this.promotionService.remove(id);
  }

  @Delete(ENDPOINTS.PROMOTION.REMOVE_PHOTO)
  async removePhoto(@Param('id') id: string, @Query() query: RemovePromotionPhotoQuery) {
    return await this.promotionService.removePhoto(id, query.photoId);
  }
}
