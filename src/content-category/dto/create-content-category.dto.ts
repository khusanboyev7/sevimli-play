import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateContentCategoryDto {
  @ApiProperty({
    example: 5,
    description: 'Content ID (foreign key to contents table)',
  })
  @IsInt()
  content_id: number;

  @ApiProperty({
    example: 2,
    description: 'Category ID (foreign key to categories table)',
  })
  @IsInt()
  category_id: number;
}
