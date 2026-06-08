# ЕАБР — статический сайт

Маркетинговый статический сайт Евразийского банка развития. Многостраничный
проект на собственной сборке Webpack: TypeScript + SCSS + система HTML-виджетов,
мультиязычность (RU/EN/ZH) и data-driven контент с имитацией API.

**Прод:** [eabr.nikolay-kolmykov.com](https://eabr.nikolay-kolmykov.com) ·
деплой автоматический через GitHub Actions при пуше в `main`.

---

## Стек

- **Webpack 5** — единая точка входа JS (`src/index.ts`) и SCSS (`src/style.scss`),
  отдельный `HtmlWebpackPlugin` на каждую страницу.
- **TypeScript** — вся логика классами в `src/main/lib/logic` и `src/main/pages/*/logic`.
- **SCSS** — глобальные стили в `src/styles`, стили компонентов и страниц
  колокированы рядом с разметкой.
- **i18next** — переводы через атрибуты `data-i18n`, локали `ru/en/zh`.
- **svg-sprite-loader** — иконки спрайтом (`/assets/sprite/sprite-svg.svg`).
- Прочее: Swiper, AirDatepicker, SlimSelect, Fancybox, Popper, anime.js.

## Требования

- Node.js **20+**
- npm

## Запуск

```shell
git clone git@github.com:w3di/static--eabr.git
cd static--eabr
npm install
npm run dev      # http://localhost:3000 (hot-reload)
```

## Скрипты

| Команда | Назначение |
| --- | --- |
| `npm run dev` | Dev-сервер с hot-reload на `http://localhost:3000` |
| `npm start` | Dev-сервер в production-режиме (порт 3000) |
| `npm run build` | Production-сборка в `dist/` (минификация, хеши) |
| `npm run typecheck` | Проверка типов (`tsc --noEmit`) |
| `npm run lint:ts` / `:fix` | ESLint по `.ts`/`.tsx` |
| `npm run lint:scss` / `:fix` | Stylelint по `.scss` |
| `npm run format` / `format:check` | Prettier |

## Структура

```
src/
  index.ts                  единая точка входа JS
  style.scss                единая точка входа стилей
  assets/                   статика → копируется в dist/assets (CopyPlugin)
  styles/                   глобальные стили, переменные, миксины, @import страниц
  main/
    data/                   общие данные (industries, fileSize, ...)
    lib/
      components/<name>/     виджеты: <name>.html (+ .scss/.ts рядом)
      sprite/                исходные SVG спрайта + index.ts
      logic/                 общая логика (app, i18n, ui, helpers)
    pages/<page>/            страница: <page>.html, <page>.scss, logic/, components/
    templates/              шаблоны генерируемых страниц (отрасли)
config/build/               конфиг сборки (виджеты, страницы, PAGE_DATA, плагины)
.github/workflows/deploy.yml CI-деплой
```

## Как это работает

- **Виджеты.** Любой `.html` в `lib/components/*/` и `pages/*/components/`
  автоматически регистрируется (`config/build/scripts/getWidgets.ts`) под именем
  файла и вставляется в шаблоны через
  `<%= htmlWebpackPlugin.options.widgets.ИМЯ %>` (lodash-шаблоны).
- **Данные страниц.** Серверные данные шаблона задаются в
  `config/build/scripts/pageData.ts` (`PAGE_DATA[ключ-страницы]`) и доступны как
  `htmlWebpackPlugin.options.data.*`. Маршруты — `src/main/lib/logic/routes.ts`.
- **i18n.** Тексты помечаются `data-i18n="ключ"` (и `data-i18n-placeholder`,
  `-aria-label`, `-alt`, `-title`); словари — `lib/logic/i18n/locales/{ru,en,zh}.ts`.
- **Data-driven списки с имитацией API.** Страницы вроде `/all-projects/` и
  `/ppp-news/` рендерят контент из TS-моков через симулированный запрос
  (`Promise` + `setTimeout`): рабочие фильтры, пагинация, состояния загрузки/пустого
  результата. Слои: `logic/<...>Data.ts` (мок-фид) → `logic/<...>Api.ts`
  (`fetch()` с фильтрацией и пагинацией) → `logic/<...>List.ts` (контроллер).
- **Иконки.** По умолчанию — спрайт `<use href="...#icon">` + `currentColor`.
  Для клиентских цветных иконок и логотипа используется `<img>` со standalone-SVG
  (внешний `<use>` с `currentColor`/градиентами не рендерится в Safari).

## Сборка и деплой

Прод-артефакты собираются в `dist/` (в гите игнорируется):

```shell
npm run build
```

**Автодеплой.** При пуше в `main` GitHub Actions
(`.github/workflows/deploy.yml`) собирает проект и заливает `dist/` на сервер
по `rsync --delete` через SSH-ключ. Запустить вручную можно из вкладки
**Actions → Deploy to production → Run workflow**.

Сервер: nginx, web-root `/var/www/eabr` на `91.184.242.51`.

Секреты репозитория (Settings → Secrets and variables → Actions):

| Секрет | Значение |
| --- | --- |
| `DEPLOY_SSH_KEY` | приватный SSH-ключ деплоя |
| `DEPLOY_HOST` | хост сервера |
| `DEPLOY_USER` | пользователь SSH |
| `DEPLOY_PATH` | путь web-root (`/var/www/eabr/`) |

**Ручной деплой** (резерв):

```shell
npm run build
rsync -az --delete dist/ <user>@<host>:/var/www/eabr/
```
