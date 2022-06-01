import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private usersRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.usersRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.usersRepository.findAll();
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new HttpException('Not found', HttpStatus.BAD_REQUEST);
    return user;
  }

  async updateUserEmail(id: number, newEmail: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    user.email = newEmail;
    user.save();
    return user;
  }

  async removeUser(id: number) {
    this.usersRepository.destroy({ where: { id } });
  }

  async setCurrentRefreshToken(userId: number, refreshToken: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 5);
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    user.hashRefreshToken = currentHashedRefreshToken;
    user.save();
  }
}
