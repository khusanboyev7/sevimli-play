import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentCategory } from './entities/content-category.entity';
import { CreateContentCategoryDto } from './dto/create-content-category.dto';
import { UpdateContentCategoryDto } from './dto/update-content-category.dto';

@Injectable()
export class ContentCategoriesService {
  constructor(
    @InjectRepository(ContentCategory)
    private readonly repo: Repository<ContentCategory>,
  ) {}

  create(dto: CreateContentCategoryDto) {
    const newRow = this.repo.create(dto);
    return this.repo.save(newRow);
  }

  findAll() {
    return this.repo.find({ relations: ['content', 'category'] });
  }

  async findOne(id: number) {
    const row = await this.repo.findOne({
      where: { id },
      relations: ['content', 'category'],
    });
    if (!row) throw new NotFoundException('ContentCategory not found');
    return row;
  }

  async update(id: number, dto: UpdateContentCategoryDto) {
    const row = await this.findOne(id);
    Object.assign(row, dto);
    return this.repo.save(row);
  }

  async remove(id: number) {
    const row = await this.findOne(id);
    return this.repo.remove(row);
  }
}
