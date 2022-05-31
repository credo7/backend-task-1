import { ApiProperty } from '@nestjs/swagger';

export class TokensDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ2aXRhbHkzQG1haWwucnUiLCJpYXQiOjE2NTM5OTQwOTksImV4cCI6MTY1NDA4MDQ5OX0.ujSNVU2b7f5a8N9haCMx9v46e8fAv-hIiNaewo6abe8',
    description: 'Access token',
  })
  readonly accessToken!: string;

  @ApiProperty({
    example:
      'Al+pJIFt1Js6NX0CwSEXHFAoXbKmU4Zuw5TDh4mD1CH+j/IB0qmQGIsf19849hDsNIlGGSrAHlIuMRhxFZHXOiIVVWn1UwLAjz84I+HwJQniEoSQ4xV5R1sKY1lWpTdd5u4l3BS23JlGP+odK6SkSPm7JRCQNGeeiFPBEmt/l0/wxgZ1Twxh69hOV8UoYkRpNv/SDs6Y4KUuZUAmx04vt8N61KZ6saffawdglyyCbdokg6qEe5Qas5LL2NJUNFfX',
    description: 'Refresh token',
  })
  readonly refreshToken!: string;
}
