import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import {
  TaskPriority,
  TaskStatus,
} from '../entities/task.entities/task.entities';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsDateString()
  dueDate?: Date;
}
