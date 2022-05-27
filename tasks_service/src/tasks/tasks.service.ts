import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task) private userRepository: typeof Task){}
}
