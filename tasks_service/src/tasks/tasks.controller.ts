import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@ApiTags('Задачи')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Добавить задачу' })
  @ApiResponse({ status: 200, type: Task })
  @Post()
  @UseGuards(JwtAuthGuard)
  createTask(@Req() req, @Body() taskDto: CreateTaskDto) {
    return this.tasksService.createTask(req.user.id, taskDto.task);
  }

  @ApiOperation({ summary: 'Получить все задачи пользователя' })
  @ApiResponse({ status: 200, type: [Task] })
  @Get()
  @UseGuards(JwtAuthGuard)
  getAllUserTasks(@Req() req) {
    return this.tasksService.getAllUserTasks(req.user.id);
  }

  @ApiOperation({ summary: 'Получить задачу по id' })
  @ApiResponse({ status: 200, type: Task })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @ApiOperation({ summary: 'Изменить задачу по id' })
  @ApiResponse({ status: 200, type: Task })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() taskDto: CreateTaskDto) {
    return this.tasksService.updateTask(+id, taskDto.task);
  }

  @ApiOperation({ summary: 'Удалить задачу по id' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.tasksService.removeTask(+id);
  }
}
