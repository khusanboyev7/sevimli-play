import { ApiProperty } from '@nestjs/swagger';

export class LoginAdminDto {
  @ApiProperty({ example: 'admin@gmail.com' })
  email: string;

  @ApiProperty({ example: '12345' })
  password: string;
}
