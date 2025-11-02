import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentTagsService } from './content-tag.service';
import { ContentTagsController } from './content-tag.controller';
import { ContentTag } from './entities/content-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentTag])],
  controllers: [ContentTagsController],
  providers: [ContentTagsService],
  exports: [ContentTagsService],
})
export class ContentTagsModule {}
