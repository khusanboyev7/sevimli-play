import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com' })
  email: string;

  @ApiProperty({ example: 'strongpassword123' })
  password: string;

  @ApiProperty({ example: '+998901234567' })
  phone: string;
}
