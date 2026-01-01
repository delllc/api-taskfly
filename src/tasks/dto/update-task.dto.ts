import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import {
  TaskStatus,
  TaskPriority,
} from '../entities/task.entities/task.entities';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    description: 'Заголовок задачи',
    example: 'Купить продукты',
    maxLength: 255,
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: 'Описание задачи',
    example: 'Купить молоко, хлеб, яйца в супермаркете',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Статус задачи',
    enum: TaskStatus,
    enumName: 'TaskStatus',
    example: TaskStatus.TODO,
    required: false,
  })
  status?: TaskStatus;

  @ApiProperty({
    description: 'Приоритет задачи',
    enum: TaskPriority,
    enumName: 'TaskPriority',
    example: TaskPriority.MEDIUM,
    required: false,
  })
  priority?: TaskPriority;

  @ApiProperty({
    description: 'Дата выполнения задачи',
    example: '2024-12-31T23:59:59.000Z',
    format: 'date-time',
    required: false,
  })
  dueDate?: Date;
}
