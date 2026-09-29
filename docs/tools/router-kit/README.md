# Router Kit

**Router Kit** — lightweight client-side router for SPAs.

Небольшой клиентский роутер для одностраничных приложений (SPA).

Router Kit — это компактный TypeScript-роутер, предназначенный прежде всего для обучения и небольших frontend-проектов. Он предоставляет клиентскую навигацию, работу с историей браузера, подписку на изменения маршрута, разбор URL, динамические маршруты и параметры маршрутов без сложности полноценного routing-фреймворка.

Проект намеренно остаётся небольшим и не зависит от конкретного UI-фреймворка.

---

## Возможности

### Реализовано

- клиентская навигация через History API;
- навигация через `pushState`;
- поддержка кнопок Back / Forward;
- обработка `popstate`;
- управление жизненным циклом роутера через `start()` / `stop()`;
- подписка на изменения маршрута;
- отписка;
- уведомление о начальном состоянии;
- перехват внутренних ссылок;
- игнорирование внешних ссылок;
- сохранение стандартного поведения ссылок с модификаторами клавиатуры;
- поддержка `target="_blank"`;
- разбор URL;
- `href`;
- `origin`;
- `pathname`;
- `search`;
- `hash`;
- статические маршруты;
- динамические маршруты;
- параметры маршрутов;
- несколько динамических параметров;
- определение неизвестных маршрутов;
- сопоставление URL с маршрутами;
- приоритет точных маршрутов над динамическими.

### Пример

```ts
const router = new Router({
  '/': {
    name: 'home',
  },

  '/about': {
    name: 'about',
  },

  '/users': {
    name: 'users',
  },

  '/users/:id': {
    name: 'user',
  },

  '/users/:userId/posts/:postId': {
    name: 'user-post',
  },

  '/users/settings': {
    name: 'settings',
  },
});
```

URL:

```text
/users/42
```

может дать:

```ts
{
  location: {
    pathname: '/users/42',
    // ...
  },

  route: {
    name: 'user',
  },

  params: {
    id: '42',
  },
}
```

URL:

```text
/users/42/posts/7
```

может дать:

```ts
{
  location: {
    pathname: '/users/42/posts/7',
    // ...
  },

  route: {
    name: 'user-post',
  },

  params: {
    userId: '42',
    postId: '7',
  },
}
```

---

# Установка

```bash
npm install @peccopa/router-kit
```

---

# Базовое использование

```ts
import { Router } from '@peccopa/router-kit';

const router = new Router({
  '/': {
    name: 'home',
  },

  '/about': {
    name: 'about',
  },

  '/users': {
    name: 'users',
  },
});

router.subscribe((state) => {
  console.log(state);
});

router.start();
```

---

# Жизненный цикл роутера

Роутер не регистрирует глобальные обработчики событий в конструкторе.

Для запуска необходимо вызвать:

```ts
router.start();
```

Для остановки:

```ts
router.stop();
```

`start()` подключает обработчики:

- `popstate`;
- кликов по ссылкам.

`stop()` удаляет их.

Повторный вызов `start()` не создаёт дублирующиеся обработчики.

Вызов `stop()` у уже остановленного роутера ничего не делает.

---

# Навигация

Программная навигация выполняется через:

```ts
router.navigate('/about');
```

Внутри используется History API:

```ts
history.pushState(...)
```

После изменения URL роутер определяет новое состояние и уведомляет подписчиков.

Кнопки браузера **Back** и **Forward** поддерживаются через событие:

```ts
popstate;
```

---

# Работа со ссылками

Роутер перехватывает внутренние ссылки:

```html
<a href="/about">About</a>
```

и выполняет клиентскую навигацию без полной перезагрузки страницы.

Внешние ссылки не перехватываются:

```html
<a href="https://example.com">External</a>
```

Также сохраняется стандартное поведение браузера при:

- `Ctrl + click`;
- `Cmd + click`;
- `Shift + click`;
- `Alt + click`;
- `target="_blank"`.

---

# RouterLocation

Роутер представляет текущее положение браузера в виде отдельного объекта:

```ts
export type RouterLocation = {
  href: string;
  origin: string;
  pathname: string;
  search: string;
  hash: string;
};
```

Например, для URL:

```text
http://localhost:5500/users/42?page=2#comments
```

получаем:

```ts
{
  href: 'http://localhost:5500/users/42?page=2#comments',
  origin: 'http://localhost:5500',
  pathname: '/users/42',
  search: '?page=2',
  hash: '#comments',
}
```

`RouterLocation` описывает **фактический URL браузера**.

---

# RouterState

Подписчики получают полное состояние маршрутизатора:

```ts
export type RouterState = {
  location: RouterLocation;
  route: Route | undefined;
  params: Record<string, string>;
};
```

Пример:

```ts
router.subscribe((state) => {
  console.log(state.location);
  console.log(state.route);
  console.log(state.params);
});
```

Для:

```text
/users/42
```

результат может выглядеть так:

```ts
{
  location: {
    pathname: '/users/42',
    // ...
  },

  route: {
    name: 'user',
  },

  params: {
    id: '42',
  },
}
```

---

# Подписки

Подписаться на изменения состояния можно через:

```ts
const unsubscribe = router.subscribe((state) => {
  render(state);
});
```

Метод возвращает функцию для удаления подписки:

```ts
unsubscribe();
```

Это позволяет компонентам подписываться при создании и удалять подписку при уничтожении.

Роутер не знает, какие именно части приложения используют его состояние.

---

# Маршруты

Маршруты заранее описываются разработчиком:

```ts
const routes = {
  '/': {
    name: 'home',
  },

  '/about': {
    name: 'about',
  },

  '/users': {
    name: 'users',
  },
};
```

Текущая структура маршрута:

```ts
export interface Route {
  name: string;
}
```

Важно различать:

```text
RouterLocation
```

и:

```text
Route
```

`RouterLocation` описывает фактический URL браузера.

`Route` содержит описание маршрута приложения, которому этот URL соответствует.

Например:

```text
/users/42
```

может соответствовать:

```ts
{
  name: 'user',
}
```

а динамический параметр при этом будет находиться отдельно:

```ts
{
  id: '42',
}
```

---

# Статические маршруты

Статический маршрут задаётся конкретным URL:

```ts
const routes = {
  '/': {
    name: 'home',
  },

  '/about': {
    name: 'about',
  },

  '/users': {
    name: 'users',
  },
};
```

Примеры:

```text
/
/about
/users
```

---

# Динамические маршруты

Динамический сегмент обозначается через `:`:

```ts
'/users/:id';
```

Он может соответствовать:

```text
/users/1
/users/42
/users/alex
```

Значение динамического сегмента извлекается в `params`:

```ts
{
  id: '42',
}
```

---

# Несколько параметров

Маршрут может содержать несколько динамических сегментов:

```ts
'/users/:userId/posts/:postId';
```

Для URL:

```text
/users/42/posts/7
```

получаем:

```ts
{
  userId: '42',
  postId: '7',
}
```

---

# Сопоставление маршрутов

Сопоставление маршрута отделено от браузерной навигации.

Matcher получает:

```text
шаблон маршрута
+
pathname
```

и определяет, соответствует ли URL этому маршруту.

Например:

```text
/users/:id
```

совпадает с:

```text
/users/42
/users/alex
```

но не совпадает с:

```text
/users
/users/42/posts
/about
```

Такое разделение позволяет держать логику сопоставления маршрутов отдельно от работы с:

- `window`;
- `document`;
- History API;
- DOM-событиями.

---

# Приоритет маршрутов

У статических маршрутов должен быть более высокий приоритет, чем у динамических.

Например:

```ts
'/users/:id';
```

и:

```ts
'/users/settings';
```

оба технически могут совпасть с:

```text
/users/settings
```

Но правильным результатом является:

```text
/users/settings
```

а не:

```text
/users/:id
```

с параметром:

```ts
{
  id: 'settings',
}
```

Поэтому сначала проверяются точные маршруты, а затем динамические.

---

# Неизвестные маршруты

Если ни один маршрут не соответствует текущему URL, роутер возвращает:

```ts
route: undefined;
```

Например:

```text
/foobar
```

может дать:

```ts
{
  location: {
    pathname: '/foobar',
    // ...
  },

  route: undefined,

  params: {},
}
```

Решение о том, как отображать страницу 404, принимает само приложение:

```ts
router.subscribe((state) => {
  if (!state.route) {
    renderNotFound();
    return;
  }

  renderRoute(state);
});
```

---

# Архитектура

Общую архитектуру можно представить так:

```text
                    Браузер
                       │
             URL / click / history
                       │
                       ▼
                    Router
              ┌────────┼────────┐
              │        │        │
              ▼        ▼        ▼
          Навигация  Matching  События
              │        │        │
              └────────┼────────┘
                       ▼
                 RouterState
                       │
                       ▼
                 Подписчики
                       │
                       ▼
                  Приложение
```

Router отвечает за:

- навигацию;
- историю браузера;
- определение маршрута;
- параметры маршрута;
- уведомление подписчиков.

Приложение отвечает за:

- рендеринг;
- страницы;
- компоненты;
- бизнес-логику.

---

# Текущая структура проекта

Структура проекта развивается, но в целом выглядит следующим образом:

```text
src/
├── core/
│   └── Router.ts
│
├── types/
│   ├── listener.ts
│   ├── route.ts
│   ├── route-match.ts
│   ├── router-location.ts
│   └── router-state.ts
│
├── utils/
│   └── matchRoute.ts
│
└── index.ts
```

Структура может изменяться по мере развития проекта.
