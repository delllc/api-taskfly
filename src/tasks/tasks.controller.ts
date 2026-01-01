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
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { TasksService, FindAllFilters } from './tasks.service';
import type { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  TaskResponseDto,
  DeleteTaskResponseDto,
} from './dto/task-response.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import {
  TaskStatus,
  TaskPriority,
} from './entities/task.entities/task.entities';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({
    summary: 'Создать новую задачу',
    description: 'Создает новую задачу для авторизованного пользователя',
  })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: 201,
    description: 'Задача успешно создана',
    type: TaskResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Ошибка валидации данных',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'array', items: { type: 'string' } },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Токен не предоставлен или недействителен',
  })
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: JwtPayload) {
    return this.tasksService.createTask(createTaskDto, user.sub);
  }

  @Get()
  @ApiOperation({
    summary: 'Получить список задач',
    description:
      'Возвращает список задач пользователя с возможностью фильтрации',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: TaskStatus,
    description: 'Фильтр по статусу задачи',
    example: TaskStatus.TODO,
  })
  @ApiQuery({
    name: 'priority',
    required: false,
    enum: TaskPriority,
    description: 'Фильтр по приоритету задачи',
    example: TaskPriority.MEDIUM,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Поиск по заголовку и описанию задачи',
    example: 'купить',
  })
  @ApiResponse({
    status: 200,
    description: 'Список задач пользователя',
    type: [TaskResponseDto],
  })
  @ApiUnauthorizedResponse({
    description: 'Токен не предоставлен или недействителен',
  })
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
  @ApiOperation({
    summary: 'Получить задачу по ID',
    description: 'Возвращает конкретную задачу пользователя по её ID',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: 'Уникальный идентификатор задачи',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @ApiResponse({
    status: 200,
    description: 'Задача найдена',
    type: TaskResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Задача не найдена',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Task with ID uuid not found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Токен не предоставлен или недействителен',
  })
  @ApiBadRequestResponse({
    description: 'Некорректный UUID',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: JwtPayload) {
    return this.tasksService.findOne(id, user);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Обновить задачу',
    description: 'Обновляет существующую задачу пользователя',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: 'Уникальный идентификатор задачи',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({
    status: 200,
    description: 'Задача успешно обновлена',
    type: TaskResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Задача не найдена',
  })
  @ApiBadRequestResponse({
    description: 'Ошибка валидации данных или некорректный UUID',
  })
  @ApiUnauthorizedResponse({
    description: 'Токен не предоставлен или недействителен',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: JwtPayload,
  ) {
    return this.tasksService.update(id, updateTaskDto, user);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Удалить задачу',
    description: 'Удаляет задачу пользователя по её ID',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: 'Уникальный идентификатор задачи',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @ApiResponse({
    status: 200,
    description: 'Задача успешно удалена',
    type: DeleteTaskResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Задача не найдена',
  })
  @ApiBadRequestResponse({
    description: 'Некорректный UUID',
  })
  @ApiUnauthorizedResponse({
    description: 'Токен не предоставлен или недействителен',
  })
  delete(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: JwtPayload) {
    return this.tasksService.remove(id, user);
  }
}
