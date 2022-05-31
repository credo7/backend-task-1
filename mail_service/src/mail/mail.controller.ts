import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  sendUserWelcome(@Body() userDto: UserDto) {
    return this.mailService.sendUserWelcome(userDto.email);
  }
}
