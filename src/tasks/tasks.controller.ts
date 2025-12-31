import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService, FindAllFilters } from './tasks.service';
import type { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import {
  TaskStatus,
  TaskPriority,
} from './entities/task.entities/task.entities';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: JwtPayload) {
    return this.tasksService.createTask(createTaskDto, user.sub);
  }

  @Get()
  findAll(
    @GetUser() user: JwtPayload,
    @Query('status') status?: TaskStatus,
    @Query('priority') priority?: TaskPriority,
    @Query('search') search?: string,
  ) {
    const filters: FindAllFilters = { status, priority, search };
    return this.tasksService.findAll(user, filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: JwtPayload) {
    return this.tasksService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: JwtPayload,
  ) {
    return this.tasksService.update(id, updateTaskDto, user);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @GetUser() user: JwtPayload) {
    return this.tasksService.remove(id, user);
  }
}
