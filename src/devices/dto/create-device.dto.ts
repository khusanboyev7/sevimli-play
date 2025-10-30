import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  profileId: number;

  @ApiProperty({ example: 'TV' })
  @IsString()
  device_type: string;

  @ApiProperty({ example: 'Samsung QLED' })
  @IsString()
  device_name: string;

  @ApiProperty({ example: 'Android' })
  @IsOptional()
  @IsString()
  os?: string;
}
