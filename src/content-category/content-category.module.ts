import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentCategoriesService } from './content-category.service';
import { ContentCategoriesController } from './content-category.controller';
import { ContentCategory } from './entities/content-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentCategory])],
  controllers: [ContentCategoriesController],
  providers: [ContentCategoriesService],
  exports: [ContentCategoriesService],
})
export class ContentCategoriesModule {}
