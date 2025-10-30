import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './entities/content.entity';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>,
  ) {}

  async create(dto: CreateContentDto): Promise<Content> {
    const newContent = this.contentRepo.create(dto);
    return this.contentRepo.save(newContent);
  }

  async findAll(): Promise<Content[]> {
    return this.contentRepo.find();
  }

  async findOne(id: number): Promise<Content> {
    const content = await this.contentRepo.findOne({ where: { id } });
    if (!content) throw new NotFoundException('Content not found');
    return content;
  }

  async update(id: number, dto: UpdateContentDto): Promise<Content> {
    const content = await this.findOne(id);
    Object.assign(content, dto);
    return this.contentRepo.save(content);
  }

  async remove(id: number): Promise<{ message: string }> {
    const content = await this.findOne(id);
    await this.contentRepo.remove(content);
    return { message: 'Content deleted successfully' };
  }
}
