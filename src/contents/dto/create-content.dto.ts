import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateContentDto {
  @ApiProperty({ example: 'movie' })
  @IsString()
  type: string;

  @ApiProperty({ example: 'Avatar 2' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Epic sci-fi adventure' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2025-02-01T00:00:00Z' })
  @IsOptional()
  @IsDateString()
  release_date?: Date;

  @ApiProperty({ example: 'en' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({ example: 'USA' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ example: 180 })
  @IsOptional()
  @IsNumber()
  duration_minutes?: number;

  @ApiProperty({ example: '13+' })
  @IsOptional()
  @IsString()
  maturity_level?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_published: boolean;

  @ApiProperty({ example: 'https://trailer.url' })
  @IsOptional()
  @IsString()
  trailer_url?: string;
}
