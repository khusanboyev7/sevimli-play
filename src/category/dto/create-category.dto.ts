import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Horror',
    description: 'Category nomi (masalan: Horror, Sci-Fi, Romance)',
  })
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiProperty({
    example: 'Qo‘rqinchli film janri uchun toifa',
    description: 'Category haqida qo‘shimcha izoh',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
