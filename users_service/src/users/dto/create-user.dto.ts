import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'vitaly.credo@gmail.com',
    description: 'User email',
  })
  readonly email!: string;

  @ApiProperty({ example: 'qwerty123', description: 'User password' })
  readonly password!: string;
}
