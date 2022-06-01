import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ProducerService } from 'src/kafka/producer.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ProducerService, UsersService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`,
      },
    }),
    ProducerService,
    UsersService
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
