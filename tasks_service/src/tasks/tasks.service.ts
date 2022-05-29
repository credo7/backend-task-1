import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task) {}

  async createTask(user_id: number, task: string) {
    const createdTask = await this.taskRepository.create({ task, user_id });
    return createdTask;
  }

  async getAllUserTasks(user_id: number) {
    const tasks = await this.taskRepository.findAll({ where: { user_id } });
    return tasks;
  }

  async findOne(id: number) {
    const foundTask = await this.taskRepository.findOne({ where: { id } });
    if (!foundTask)
      throw new HttpException('Task not found', HttpStatus.BAD_REQUEST);
    return foundTask;
  }

  async updateTask(id: number, newTask: string) {
    const currentTask = await this.taskRepository.findOne({ where: { id } });
    if (!currentTask)
      throw new HttpException('Task not found', HttpStatus.BAD_REQUEST);
    currentTask.task = newTask;
    currentTask.save();
    return currentTask;
  }

  async removeTask(id: number) {
    const currentTask = await this.taskRepository.findOne({ where: { id } });
    if (!currentTask)
      throw new HttpException('Task not found', HttpStatus.BAD_REQUEST);
    currentTask.destroy();
  }
}
