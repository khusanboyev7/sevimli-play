import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ContentTagsService } from './content-tag.service';
import { CreateContentTagDto } from './dto/create-content-tag.dto';
import { UpdateContentTagDto } from './dto/update-content-tag.dto';

@Controller('content-tags')
export class ContentTagsController {
  constructor(private readonly contentTagsService: ContentTagsService) {}

  @Post()
  create(@Body() dto: CreateContentTagDto) {
    return this.contentTagsService.create(dto);
  }

  @Get()
  findAll() {
    return this.contentTagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.contentTagsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateContentTagDto) {
    return this.contentTagsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.contentTagsService.remove(id);
  }
}
