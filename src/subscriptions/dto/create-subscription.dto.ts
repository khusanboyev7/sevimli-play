import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDateString, IsBoolean } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  userId: number; // 'user' emas, 'userId'

  @ApiProperty({ example: 2 })
  @IsNumber()
  planId: number; // 'plan' emas, 'planId'

  @ApiProperty({ example: 'active' })
  @IsString()
  status: string;

  @ApiProperty({ example: '2025-01-01T00:00:00Z' })
  @IsDateString()
  start_date: Date;

  @ApiProperty({ example: '2025-02-01T00:00:00Z' })
  @IsDateString()
  end_date: Date;

  @ApiProperty({ example: true })
  @IsBoolean()
  auto_renew: boolean;
}
