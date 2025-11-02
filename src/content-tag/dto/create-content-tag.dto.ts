import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateContentTagDto {
  @ApiProperty({
    example: 1,
    description: 'Content ID (foreign key to contents table)',
  })
  @IsInt()
  content_id: number;

  @ApiProperty({
    example: 3,
    description: 'Tag ID (foreign key to tags table)',
  })
  @IsInt()
  tag_id: number;
}
