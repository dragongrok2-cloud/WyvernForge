# Архитектура WyvernForge

## Обзор

WyvernForge — это платформа, объединяющая:
- **Магазин и библиотеку игр** (как Steam)
- **Социальную сеть** (как Facebook / Instagram) для поиска друзей и игроков

## Основные модули

### 1. Frontend (`/frontend`)
- **Next.js 15** (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- React Query / TanStack Query для данных
- Socket.io-client для real-time

### 2. Backend (`/backend`)
- **NestJS** + TypeScript
- Prisma ORM
- PostgreSQL (основная БД)
- Redis (кэш + сессии + pub/sub)
- Socket.io (чат, уведомления, онлайн-статус)

### 3. Shared (`/shared`)
- Общие TypeScript-типы
- Константы
- Валидационные схемы (Zod)

## Ключевые домены

| Домен              | Описание                                      |
|--------------------|-----------------------------------------------|
| **Auth**           | Регистрация, логин, OAuth (Steam, Discord, Google) |
| **Users & Profiles** | Профили, аватары, статусы, био                |
| **Social Graph**   | Друзья, подписки, рекомендации                |
| **Feed**           | Лента постов, сторис, реакции                 |
| **Groups / Clans** | Сообщества по играм                           |
| **Matchmaking**    | Поиск игроков по игре, рангу, языку           |
| **Store**          | Магазин игр, корзина, платежи                 |
| **Library**        | Библиотека игр пользователя                   |
| **Chat**           | Личные и групповые чаты                       |
| **Notifications**  | Real-time уведомления                         |

## Структура папок (целевая)

```
WyvernForge/
├── frontend/                 # Next.js приложение
│   ├── src/
│   │   ├── app/              # App Router страницы
│   │   ├── components/       # UI-компоненты
│   │   ├── features/         # Фичи по доменам
│   │   │   ├── auth/
│   │   │   ├── social/
│   │   │   ├── store/
│   │   │   ├── library/
│   │   │   ├── friends/
│   │   │   └── matchmaking/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── types/
│   └── public/
├── backend/                  # NestJS API
│   ├── src/
│   │   ├── modules/          # Модули по доменам
│   │   ├── common/
│   │   ├── prisma/
│   │   └── main.ts
│   └── prisma/
│       └── schema.prisma
├── shared/                   # Общий код
│   ├── types/
│   └── constants/
├── docs/
├── docker-compose.yml
└── README.md
```

## Следующие шаги

1. Инициализация frontend (Next.js)
2. Инициализация backend (NestJS + Prisma)
3. Базовая модель User + Profile
4. Система друзей и рекомендаций
5. Лента и посты
