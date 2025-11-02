import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    example: 'Action',
    description: 'Tag nomi (masalan: Action, Comedy, Drama)',
  })
  @IsString()
  @Length(2, 50)
  name: string;
}
