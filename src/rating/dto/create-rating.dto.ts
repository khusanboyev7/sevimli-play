import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({
    example: 1,
    description: 'Content ID (foreign key to contents table)',
  })
  @IsInt()
  content_id: number;

  @ApiProperty({
    example: 2,
    description: 'Profile ID (foreign key to profiles table)',
  })
  @IsInt()
  profile_id: number;

  @ApiProperty({
    example: 5,
    description: 'Foydalanuvchi reytingi (1 dan 5 gacha)',
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    example: 'Zo‘r serial edi, ayniqsa final qismi!',
    description: 'Foydalanuvchi yozgan izoh (ixtiyoriy)',
    required: false,
  })
  @IsOptional()
  @IsString()
  review?: string;
}
