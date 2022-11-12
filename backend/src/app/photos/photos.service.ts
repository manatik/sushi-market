import { ErrorService } from '@error/error.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { PhotosEntity } from './entity/photos.entity';

@Injectable()
export class PhotosService {
  constructor(
    private readonly errorService: ErrorService,
    @InjectRepository(PhotosEntity)
    private readonly photoRepository: Repository<PhotosEntity>,
  ) {}

  async create(dto: CreatePhotoDto) {
    try {
      const entity = this.photoRepository.create(dto);

      return await this.photoRepository.save(entity);
    } catch (e) {
      return this.errorService.internal('Ошибка создания фото', e.message);
    }
  }
}
