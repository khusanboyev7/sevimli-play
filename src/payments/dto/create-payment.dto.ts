import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 3 })
  @IsNumber()
  subscriptionId: number;

  @ApiProperty({ example: 'Stripe' })
  @IsString()
  provider: string;

  @ApiProperty({ example: 'tx_123abc' })
  @IsOptional()
  @IsString()
  transaction_id?: string;

  @ApiProperty({ example: 9.99 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'USD' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ example: 'completed' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  paid: boolean;
}
