import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface TaskAttrs {
  task: string;
  user_id: number;
}

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, TaskAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный индефикатор задачи' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ApiProperty({
    example: '1',
    description: 'Уникальный индефикатор пользователя',
  })
  @Column({
    type: DataType.INTEGER,
  })
  user_id!: number;

  @ApiProperty({ example: 'Помыть посуду', description: 'Задача' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  task!: string;
}
