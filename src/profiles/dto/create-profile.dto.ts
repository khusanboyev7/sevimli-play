import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 'Kamronbek' })
  @IsString()
  display_name: string;

  @ApiProperty({ example: 'https://cdn.site/avatar.png' })
  @IsOptional()
  @IsString()
  avatar_url?: string;

  @ApiProperty({ example: 'uz' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({ example: '16+' })
  @IsOptional()
  @IsString()
  maturity_level?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_default: boolean;
}
