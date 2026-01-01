import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus, TaskPriority } from '../entities/task.entities/task.entities';

export class TaskUserDto {
  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'user@example.com',
    format: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'john_doe',
  })
  username: string;
}

export class TaskResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор задачи',
    example: '550e8400-e29b-41d4-a716-446655440001',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Заголовок задачи',
    example: 'Купить продукты',
  })
  title: string;

  @ApiProperty({
    description: 'Описание задачи',
    example: 'Купить молоко, хлеб, яйца в супермаркете',
    nullable: true,
  })
  description?: string;

  @ApiProperty({
    description: 'Статус задачи',
    enum: TaskStatus,
    enumName: 'TaskStatus',
    example: TaskStatus.TODO,
  })
  status: TaskStatus;

  @ApiProperty({
    description: 'Приоритет задачи',
    enum: TaskPriority,
    enumName: 'TaskPriority',
    example: TaskPriority.MEDIUM,
  })
  priority: TaskPriority;

  @ApiProperty({
    description: 'Дата выполнения задачи',
    example: '2024-12-31T23:59:59.000Z',
    format: 'date-time',
    nullable: true,
  })
  dueDate?: Date;

  @ApiProperty({
    description: 'Дата создания задачи',
    example: '2024-01-01T10:00:00.000Z',
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Дата последнего обновления задачи',
    example: '2024-01-01T10:30:00.000Z',
    format: 'date-time',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Владелец задачи',
    type: TaskUserDto,
  })
  user: TaskUserDto;
}

export class TasksListResponseDto {
  @ApiProperty({
    description: 'Массив задач',
    type: [TaskResponseDto],
  })
  tasks: TaskResponseDto[];

  @ApiProperty({
    description: 'Общее количество задач',
    example: 42,
  })
  total: number;
}

export class DeleteTaskResponseDto {
  @ApiProperty({
    description: 'Сообщение об успешном удалении',
    example: 'Успешно удалена',
  })
  message: string;
}
