import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './kafka/consumer.service';
import { MailService } from './mail/mail.service';

@Injectable()
export class WelcomeConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly mailService: MailService,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume(
      { topic: 'registration' },
      {
        eachMessage: async ({ message }) => {
          this.mailService.sendUserWelcome(message.value.toString());
          await sleep(1000);
        },
      },
    );
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
