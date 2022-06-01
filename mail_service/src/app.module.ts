import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WelcomeConsumer } from './welcome.consumer';
import { KafkaModule } from './kafka/kafka.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MailModule,
    KafkaModule,
  ],
  providers: [WelcomeConsumer],
})
export class AppModule {}
