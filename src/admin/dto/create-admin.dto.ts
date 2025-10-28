import { ApiProperty } from '@nestjs/swagger';
import { AdminRole } from '../entities/admin.entity';

export class CreateAdminDto {
  @ApiProperty({ example: 'admin@gmail.com' })
  email: string;

  @ApiProperty({ example: 'strongpassword123' })
  password: string;

  @ApiProperty({ example: 'Ali Karimov' })
  full_name: string;

  @ApiProperty({ enum: AdminRole, default: AdminRole.MODERATOR })
  role?: AdminRole;
}
