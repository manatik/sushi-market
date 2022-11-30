import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { Public, Roles } from '@jwt-auth/decorators';
import { Role } from '@jwt-auth/enum';
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
import { AddPhotosDto } from '@product/dto/add-photos.dto';
import { CreateProductDto } from '@product/dto/create-product.dto';
import { GetAllQuery } from '@product/dto/get-all.query';
import { RemoveProductPhotoQuery } from '@product/dto/remove-product-photo.query';
import { UpdateProductDto } from '@product/dto/update-product.dto';
import { ProductService } from '@product/product.service';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.PRODUCT)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get(ENDPOINTS.PRODUCT.ALL)
  async all(@Query() query: GetAllQuery) {
    return await this.productService.all(query);
  }

  @Public()
  @Get(ENDPOINTS.PRODUCT.BY_ID)
  async byId(@Param('id') id: string) {
    return await this.productService.byId(id);
  }

  @Public()
  @Post(ENDPOINTS.PRODUCT.CREATE)
  async create(@Body() dto: CreateProductDto) {
    return await this.productService.create(dto);
  }

  @UseInterceptors(FilesInterceptor('photos'))
  @Post(ENDPOINTS.PRODUCT.ADD_PHOTOS)
  async add(@Param('id') id: string, @UploadedFiles() photos: Array<Express.Multer.File>, @Body() dto: AddPhotosDto) {
    return await this.productService.addPhotos(id, photos, dto);
  }

  @Patch(ENDPOINTS.PRODUCT.UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return await this.productService.update(id, dto);
  }

  @Delete(ENDPOINTS.PRODUCT.REMOVE)
  async remove(@Param('id') id: string) {
    return await this.productService.remove(id);
  }

  @Delete(ENDPOINTS.PRODUCT.REMOVE_PHOTO)
  async removePhoto(@Param('id') id: string, @Query() query: RemoveProductPhotoQuery) {
    return await this.productService.removePhoto(id, query.photoId);
  }
}
