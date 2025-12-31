import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Task,
  TaskStatus,
  TaskPriority,
} from './entities/task.entities/task.entities';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import type { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

export interface FindAllFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  search?: string;
}

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, userId: string) {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      user: { id: userId },
    });

    return await this.tasksRepository.save(task);
  }

  async findAll(user: JwtPayload, filters?: FindAllFilters) {
    const userId = user.sub;

    const query = this.tasksRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.user', 'user')
      .where('user.id = :userId', { userId });

    if (filters?.status) {
      query.andWhere('task.status = :status', { status: filters.status });
    }

    if (filters?.priority) {
      query.andWhere('task.priority = :priority', {
        priority: filters.priority,
      });
    }

    if (filters?.search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${filters.search}%` },
      );
    }

    query.orderBy('task.createdAt', 'DESC');

    return await query.getMany();
  }

  async findOne(id: string, user: JwtPayload) {
    const userId = user.sub;

    const task = await this.tasksRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user'],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, user: JwtPayload) {
    const task = await this.findOne(id, user);

    Object.assign(task, updateTaskDto);

    return await this.tasksRepository.save(task);
  }

  async remove(id: string, user: JwtPayload) {
    const task = await this.findOne(id, user);

    await this.tasksRepository.remove(task);

    return { message: 'Успешно удалена' };
  }
}
