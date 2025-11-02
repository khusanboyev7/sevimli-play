import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentTag } from './entities/content-tag.entity';
import { CreateContentTagDto } from './dto/create-content-tag.dto';
import { UpdateContentTagDto } from './dto/update-content-tag.dto';

@Injectable()
export class ContentTagsService {
  constructor(
    @InjectRepository(ContentTag)
    private readonly contentTagRepo: Repository<ContentTag>,
  ) {}

  create(dto: CreateContentTagDto) {
    const newContentTag = this.contentTagRepo.create(dto);
    return this.contentTagRepo.save(newContentTag);
  }

  findAll() {
    return this.contentTagRepo.find({ relations: ['content', 'tag'] });
  }

  async findOne(id: number) {
    const contentTag = await this.contentTagRepo.findOne({
      where: { id },
      relations: ['content', 'tag'],
    });
    if (!contentTag) throw new NotFoundException('ContentTag not found');
    return contentTag;
  }

  async update(id: number, dto: UpdateContentTagDto) {
    const contentTag = await this.findOne(id);
    Object.assign(contentTag, dto);
    return this.contentTagRepo.save(contentTag);
  }

  async remove(id: number) {
    const contentTag = await this.findOne(id);
    return this.contentTagRepo.remove(contentTag);
  }
}
