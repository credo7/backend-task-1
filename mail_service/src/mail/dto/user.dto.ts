import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    example: 'Vitaly@gmail.com',
  })
  readonly email!: string;
}
