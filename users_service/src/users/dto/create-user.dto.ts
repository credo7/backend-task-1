import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'vitaly.credo@gmail.com',
    description: 'Почтовый адрес',
  })
  readonly email: string;

  @ApiProperty({ example: 'qwerty123', description: 'Пароль пользователя' })
  readonly password: string;
}
