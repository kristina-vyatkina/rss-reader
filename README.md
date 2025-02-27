# Мой Svelte проект

## Разработка

После клонирования репозитория установите зависимости:

```bash
npm install
```

Запустите сервер разработки:

```bash
npm run dev

# Или откройте приложение автоматически в браузере
npm run dev -- --open
```

## Сборка для production

Для создания production-сборки:

```bash
npm run build
```

Просмотр собранного проекта:

```bash
npm run preview
```

## Деплой

Для деплоя установите необходимый [адаптер](https://svelte.dev/docs/adapters):
```bash
npm install @sveltejs/adapter-auto@latest
```

## Проверка кода

Запуск линтеров и проверка типов:
```bash
npm run format   # Форматирование кода
npm run lint     # Проверка стиля кода
npm run check    # Проверка типов
