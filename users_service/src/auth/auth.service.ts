import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.model';
import { ProducerService } from 'src/kafka/producer.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private producerService: ProducerService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    const tokens = await this.getTokens(user);
    await this.usersService.setCurrentRefreshToken(
      user.id,
      tokens.refreshToken,
    );
    await this.producerService.produce({
      topic: 'registration',
      messages: [
        {
          value: userDto.email,
        },
      ],
    });
    return tokens;
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'User with this email address already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);

    const user = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    });

    const tokens = await this.getTokens(user);

    await this.usersService.setCurrentRefreshToken(
      user.id,
      tokens.refreshToken,
    );

    return tokens;
  }

  async refresh(id: number, oldRefreshToken) {
    const user = await this.usersService.findOne(id);

    const isRefreshTokenMatching = await bcrypt.compare(
      oldRefreshToken,
      user.hashRefreshToken,
    );

    const isValid = await this.jwtService.verify(oldRefreshToken, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    });

    if (user && isRefreshTokenMatching && isValid) {
      const tokens = await this.getTokens(user);

      this.usersService.setCurrentRefreshToken(user.id, tokens.refreshToken);

      return tokens;
    }

    throw new HttpException('Incorrect refreshToken', HttpStatus.BAD_REQUEST);
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);

    if (!user) {
      throw new UnauthorizedException({
        message: 'User is not found',
      });
    }

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Incorrect password',
    });
  }

  private async getTokens(user: User) {
    const payload = { id: user.id, email: user.email };

    const accessToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`,
    });

    const refreshToken = await this.jwtService.sign(
      {},
      {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}s`,
      },
    );

    return { accessToken, refreshToken };
  }
}
