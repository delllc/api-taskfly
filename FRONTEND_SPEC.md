# Frontend Technical Specification

## Task Manager Application - Frontend Requirements

### Обзор проекта

Веб-приложение для управления задачами с современным UI/UX, адаптивным дизайном и отзывчивым интерфейсом.

---

## Технологический стек

### Core

| Технология | Версия | Назначение |
|------------|--------|------------|
| **React** | 18+ | UI библиотека |
| **TypeScript** | 5+ | Типизация |
| **Vite** | 5+ | Сборщик |

### State Management

| Технология | Назначение |
|------------|------------|
| **Zustand** | Глобальное состояние (auth, user, UI) |
| **TanStack Query (React Query)** | Серверное состояние, кэширование, синхронизация |

### Routing

| Технология | Назначение |
|------------|------------|
| **React Router v6** | Клиентская маршрутизация |

### UI/Styling

| Технология | Назначение |
|------------|------------|
| **Tailwind CSS** | Utility-first стили |
| **shadcn/ui** | Готовые компоненты на базе Radix UI |
| **Lucide React** | Иконки |
| **Framer Motion** | Анимации |

### Forms & Validation

| Технология | Назначение |
|------------|------------|
| **React Hook Form** | Управление формами |
| **Zod** | Валидация схем |

### HTTP Client

| Технология | Назначение |
|------------|------------|
| **Axios** | HTTP запросы с interceptors |

---

## Структура проекта

```
frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── api/
│   │   ├── axios.ts              # Axios instance с interceptors
│   │   ├── auth.api.ts           # Auth API calls
│   │   └── tasks.api.ts          # Tasks API calls
│   │
│   ├── components/
│   │   ├── ui/                   # shadcn/ui компоненты
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── select.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Layout.tsx
│   │   │   └── MobileNav.tsx
│   │   │
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   │
│   │   └── tasks/
│   │       ├── TaskCard.tsx
│   │       ├── TaskList.tsx
│   │       ├── TaskForm.tsx
│   │       ├── TaskFilters.tsx
│   │       ├── TaskBoard.tsx     # Kanban view
│   │       └── TaskDetails.tsx
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useTasks.ts
│   │   ├── useDebounce.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── store/
│   │   ├── authStore.ts          # Zustand: auth state
│   │   ├── uiStore.ts            # Zustand: sidebar, theme, modals
│   │   └── filterStore.ts        # Zustand: task filters
│   │
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── TasksPage.tsx
│   │   ├── TaskDetailPage.tsx
│   │   └── NotFoundPage.tsx
│   │
│   ├── types/
│   │   ├── auth.types.ts
│   │   ├── task.types.ts
│   │   └── api.types.ts
│   │
│   ├── lib/
│   │   ├── utils.ts              # cn() helper и прочие утилиты
│   │   └── constants.ts
│   │
│   ├── styles/
│   │   └── globals.css           # Tailwind directives
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── .env
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Функциональные требования

### 1. Аутентификация

#### Регистрация
- [ ] Форма с полями: email, username, password, confirm password
- [ ] Валидация на клиенте (Zod)
- [ ] Показ ошибок валидации под полями
- [ ] Показ серверных ошибок (email уже занят и т.д.)
- [ ] Редирект на dashboard после успешной регистрации
- [ ] Кнопка "Уже есть аккаунт? Войти"

#### Вход
- [ ] Форма с полями: email, password
- [ ] "Запомнить меня" checkbox (опционально)
- [ ] Показ ошибок
- [ ] Редирект на dashboard после успешного входа
- [ ] Кнопка "Нет аккаунта? Зарегистрироваться"

#### Управление сессией
- [ ] Хранение JWT в localStorage или httpOnly cookie
- [ ] Автоматический refresh токена (если реализован на бэке)
- [ ] Axios interceptor для добавления Authorization header
- [ ] Автоматический logout при 401 ошибке
- [ ] Редирект на login при отсутствии токена

### 2. Задачи (Tasks)

#### Список задач
- [ ] Отображение списка задач пользователя
- [ ] Два режима отображения: список и kanban-доска
- [ ] Infinite scroll или пагинация
- [ ] Pull-to-refresh (мобильные)
- [ ] Skeleton loading при загрузке
- [ ] Empty state когда задач нет

#### Фильтрация и поиск
- [ ] Фильтр по статусу (todo, in-progress, done)
- [ ] Фильтр по приоритету (low, medium, high)
- [ ] Текстовый поиск по title/description
- [ ] Debounced поиск (300ms)
- [ ] Сохранение фильтров в URL (query params)
- [ ] Кнопка "Сбросить фильтры"

#### Создание задачи
- [ ] Модальное окно или отдельная страница
- [ ] Поля: title (required), description, status, priority, dueDate
- [ ] Date picker для dueDate
- [ ] Валидация формы
- [ ] Optimistic update (сразу показать в списке)
- [ ] Toast уведомление об успехе/ошибке

#### Редактирование задачи
- [ ] Inline редактирование или модалка
- [ ] Быстрое изменение статуса (клик или drag-n-drop)
- [ ] Сохранение по blur или кнопке
- [ ] Optimistic update

#### Удаление задачи
- [ ] Confirmation dialog перед удалением
- [ ] Optimistic update
- [ ] Toast уведомление
- [ ] Возможность отмены (undo) в течение 5 секунд (опционально)

#### Kanban доска
- [ ] Три колонки: To Do, In Progress, Done
- [ ] Drag-n-drop задач между колонками
- [ ] Автоматическое обновление статуса при перетаскивании
- [ ] Анимация перемещения

### 3. UI/UX

#### Общие требования
- [ ] Полностью адаптивный дизайн (mobile-first)
- [ ] Тёмная и светлая тема
- [ ] Сохранение темы в localStorage
- [ ] Плавные анимации и transitions
- [ ] Loading states для всех async операций
- [ ] Error boundaries для graceful error handling
- [ ] Toast уведомления для feedback

#### Навигация
- [ ] Header с логотипом и user menu
- [ ] Sidebar с навигацией (collapsible на desktop)
- [ ] Bottom navigation на мобильных
- [ ] Breadcrumbs где уместно

#### Доступность (a11y)
- [ ] Семантическая разметка
- [ ] Правильные aria-labels
- [ ] Keyboard navigation
- [ ] Focus management в модалках
- [ ] Contrast ratio по WCAG 2.1

---

## Environment Variables

```env
# .env.example

VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Task Manager
```

---

## Роутинг

```typescript
// App.tsx routes

<Routes>
  {/* Public routes */}
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  
  {/* Protected routes */}
  <Route element={<ProtectedRoute />}>
    <Route element={<Layout />}>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/tasks/:id" element={<TaskDetailPage />} />
    </Route>
  </Route>
  
  {/* 404 */}
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

---

## Дизайн система

### Цветовая палитра (Tailwind)

```javascript
// tailwind.config.js

module.exports = {
  theme: {
    extend: {
      colors: {
        // Использовать CSS variables для поддержки тем
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... остальные цвета shadcn/ui
      },
    },
  },
};
```

### Цвета статусов и приоритетов

| Элемент | Цвет |
|---------|------|
| Status: todo | `gray-500` |
| Status: in-progress | `blue-500` |
| Status: done | `green-500` |
| Priority: low | `slate-400` |
| Priority: medium | `yellow-500` |
| Priority: high | `red-500` |

---

## Команды для старта

```bash
# Создание проекта
npm create vite@latest frontend -- --template react-ts
cd frontend

# Установка зависимостей
npm install

# State management
npm install zustand @tanstack/react-query

# Routing
npm install react-router-dom

# UI
npm install tailwindcss postcss autoprefixer
npm install lucide-react framer-motion
npx shadcn@latest init

# Forms
npm install react-hook-form @hookform/resolvers zod

# HTTP
npm install axios

# Дополнительно
npm install clsx tailwind-merge
npm install @dnd-kit/core @dnd-kit/sortable  # для drag-n-drop

# Dev dependencies
npm install -D @types/node
```

---

## Критерии готовности (Definition of Done)

- [ ] Все страницы реализованы и работают
- [ ] Полная интеграция с backend API
- [ ] Работает авторизация и защита роутов
- [ ] Фильтрация и поиск задач работают
- [ ] Kanban доска с drag-n-drop
- [ ] Адаптивный дизайн (mobile, tablet, desktop)
- [ ] Тёмная/светлая тема
- [ ] Loading и error states везде
- [ ] Optimistic updates для лучшего UX
- [ ] Нет TypeScript ошибок
- [ ] Нет console errors/warnings
- [ ] Код отформатирован (Prettier)
- [ ] Базовые тесты (опционально)

---

## Полезные ресурсы

- [shadcn/ui docs](https://ui.shadcn.com/)
- [Zustand docs](https://zustand-demo.pmnd.rs/)
- [TanStack Query docs](https://tanstack.com/query/latest)
- [React Router docs](https://reactrouter.com/)
- [React Hook Form docs](https://react-hook-form.com/)
- [Framer Motion docs](https://www.framer.com/motion/)
- [dnd-kit docs](https://dndkit.com/)
