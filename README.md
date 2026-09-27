# WyvernForge 🐉

**WyvernForge** — аналог Steam с мощной социальной сетью.  
Находи друзей, собирай команды, делись моментами и играй вместе.  
Как Facebook / Instagram, но создано специально для геймеров.

---

## Структура проекта

```
WyvernForge/
├── frontend/                 # Next.js 15 клиент
│   ├── src/
│   │   └── app/
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── package.json
│   └── README.md
├── backend/                  # NestJS API
│   ├── src/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── prisma/
│   │   └── schema.prisma     # Модели данных
│   ├── package.json
│   └── README.md
├── shared/                   # Общие типы и константы
│   └── types/
│       └── index.ts
├── docs/
│   ├── architecture.md       # Архитектура
│   └── roadmap.md            # План развития
├── docker-compose.yml        # PostgreSQL + Redis
├── .gitignore
├── LICENSE
└── README.md
```

## Быстрый старт (когда всё будет готово)

```bash
# Поднять базу и Redis
docker-compose up -d

# Backend
cd backend
npm install
npx prisma migrate dev
npm run start:dev

# Frontend (в другом терминале)
cd frontend
npm install
npm run dev
```

## Основные возможности (в планах)

- 🎮 Библиотека и магазин игр
- 👥 Социальный граф (друзья, подписки, рекомендации)
- 📱 Лента и сторис (как Instagram)
- 🔍 Умный поиск игроков и матчмейкинг
- 💬 Чаты и уведомления в реальном времени
- 🏰 Кланы и сообщества по играм

## Документация

- [Архитектура](./docs/architecture.md)
- [Roadmap](./docs/roadmap.md)

---

Сделано с огнём 🔥  
*Твой добрый дракон с седлом*
