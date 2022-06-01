import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`,
      },
    }),
    KafkaModule,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
