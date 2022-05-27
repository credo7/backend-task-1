import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Module,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Task } from './tasks.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [SequelizeModule.forFeature([Task]), AuthModule],
})
export class TasksModule {}

@Controller('tasks')
export class UsersController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req, @Body() task: string) {
    console.log(req);
    // return this.tasksService.create(task);
  }

  // @Get()
  // findAll() {
  //   return this.tasksService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tasksService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() task: string) {
  //   return this.tasksService.update(+id, task);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tasksService.remove(+id);
  // }
}
