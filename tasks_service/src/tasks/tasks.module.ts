import {
  Module,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Task } from './tasks.model';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [SequelizeModule.forFeature([Task]), AuthModule],
})
export class TasksModule {}
