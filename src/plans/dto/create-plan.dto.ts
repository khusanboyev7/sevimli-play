import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanDto {
  @ApiProperty({ example: 'Premium' })
  title: string;

  @ApiProperty({ example: 149000 })
  price: number;

  @ApiProperty({ example: 'UZS' })
  currency: string;

  @ApiProperty({ example: 'monthly' })
  billing_period: string;

  @ApiProperty({ example: '1080p' })
  video_quality: string;

  @ApiProperty({ example: 4 })
  max_profiles: number;

  @ApiProperty({ example: 2 })
  concurrent_streams: number;
}
