import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import {
  TaskPriority,
  TaskStatus,
} from '../entities/task.entities/task.entities';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Заголовок задачи',
    example: 'Купить продукты',
    maxLength: 255,
  })
  @IsString({ message: 'Заголовок должен быть строкой' })
  title: string;

  @ApiProperty({
    description: 'Описание задачи (необязательно)',
    example: 'Купить молоко, хлеб, яйца в супермаркете',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Описание должно быть строкой' })
  description?: string;

  @ApiProperty({
    description: 'Статус задачи',
    enum: TaskStatus,
    enumName: 'TaskStatus',
    example: TaskStatus.TODO,
    default: TaskStatus.TODO,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'Статус должен быть одним из: todo, in-progress, done',
  })
  status?: TaskStatus;

  @ApiProperty({
    description: 'Приоритет задачи',
    enum: TaskPriority,
    enumName: 'TaskPriority',
    example: TaskPriority.MEDIUM,
    default: TaskPriority.MEDIUM,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskPriority, {
    message: 'Приоритет должен быть одним из: low, medium, high',
  })
  priority?: TaskPriority;

  @ApiProperty({
    description: 'Дата выполнения задачи (необязательно)',
    example: '2024-12-31T23:59:59.000Z',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Дата должна быть в формате ISO 8601' })
  dueDate?: Date;
}
