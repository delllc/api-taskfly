# Task API Backend

REST API для управления задачами, построенный на NestJS с PostgreSQL.

## Технологии

- **NestJS** — фреймворк для Node.js
- **TypeORM** — ORM для работы с базой данных
- **PostgreSQL** — база данных
- **JWT** — аутентификация
- **bcryptjs** — хэширование паролей

## Требования

- Node.js >= 18
- PostgreSQL >= 14
- npm или yarn

## Установка

1. **Клонируйте репозиторий:**

```bash
git clone <repository-url>
cd backend
```

2. **Установите зависимости:**

```bash
npm install
```

3. **Создайте файл `.env`:**

```bash
cp .env.example .env
```

4. **Настройте переменные окружения в `.env`:**

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password_here
DB_NAME=taskapi

# JWT Configuration
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRES_IN=1h

# Server Configuration
PORT=3000
```

5. **Создайте базу данных PostgreSQL:**

```sql
CREATE DATABASE taskapi;
```

6. **Запустите приложение:**

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Endpoints

### Аутентификация

| Метод | Endpoint | Описание | Авторизация |
|-------|----------|----------|-------------|
| POST | `/auth/signup` | Регистрация | ❌ |
| POST | `/auth/signin` | Вход | ❌ |

#### Регистрация

```bash
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "username": "username"
}
```

#### Вход

```bash
POST /auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Ответ:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username"
  }
}
```

### Задачи

Все эндпоинты задач требуют авторизации. Добавьте заголовок:

```
Authorization: Bearer <access_token>
```

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/tasks` | Получить все задачи |
| GET | `/tasks/:id` | Получить задачу по ID |
| POST | `/tasks` | Создать задачу |
| PATCH | `/tasks/:id` | Обновить задачу |
| DELETE | `/tasks/:id` | Удалить задачу |

#### Получить задачи с фильтрацией

```bash
GET /tasks?status=todo&priority=high&search=купить
```

**Query параметры:**

| Параметр | Тип | Значения | Описание |
|----------|-----|----------|----------|
| `status` | enum | `todo`, `in-progress`, `done` | Фильтр по статусу |
| `priority` | enum | `low`, `medium`, `high` | Фильтр по приоритету |
| `search` | string | любой текст | Поиск по title и description |

#### Создать задачу

```bash
POST /tasks
Content-Type: application/json

{
  "title": "Купить продукты",
  "description": "Молоко, хлеб, яйца",
  "status": "todo",
  "priority": "medium",
  "dueDate": "2024-12-31T23:59:59.000Z"
}
```

#### Обновить задачу

```bash
PATCH /tasks/:id
Content-Type: application/json

{
  "status": "done"
}
```

## Структура проекта

```
src/
├── auth/
│   ├── decorators/
│   │   ├── get-user.decorator.ts
│   │   └── public.decorator.ts
│   ├── interfaces/
│   │   └── jwt-payload.interface.ts
│   ├── auth.controller.ts
│   ├── auth.guard.ts
│   ├── auth.module.ts
│   └── auth.service.ts
├── tasks/
│   ├── dto/
│   │   ├── create-task.dto.ts
│   │   └── update-task.dto.ts
│   ├── entities/
│   │   └── task.entities/
│   │       └── task.entities.ts
│   ├── tasks.controller.ts
│   ├── tasks.module.ts
│   └── tasks.service.ts
├── users/
│   ├── entities/
│   │   └── user.entities.ts
│   ├── users.module.ts
│   └── users.service.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

## Модели данных

### User

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | Primary key |
| email | string | Уникальный email |
| username | string | Имя пользователя |
| password | string | Хэшированный пароль |
| tasks | Task[] | Связанные задачи |

### Task

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | Primary key |
| title | string | Заголовок задачи |
| description | string? | Описание (опционально) |
| status | enum | `todo`, `in-progress`, `done` |
| priority | enum | `low`, `medium`, `high` |
| dueDate | Date? | Дедлайн (опционально) |
| createdAt | Date | Дата создания |
| updatedAt | Date | Дата обновления |
| user | User | Владелец задачи |

## Скрипты

```bash
# Разработка с hot-reload
npm run start:dev

# Сборка проекта
npm run build

# Запуск production
npm run start:prod

# Линтинг
npm run lint

# Форматирование кода
npm run format

# Тесты
npm run test

# Тесты с coverage
npm run test:cov
```
