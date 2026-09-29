# GitHub Workflow

## Назначение

Этот документ описывает рабочий процесс GitHub для проектов, созданных на основе starter pack.

Цель — не допускать случайных изменений в `main` и проверять изменения до их слияния.

---

## Основная схема

```text
feature / fix / chore / ...
            │
            │ push
            ▼
          GitHub
            │
            ▼
     Pull Request
            │
      ┌─────┴─────┐
      │           │
     CI         Review
      │           │
   npm lint    approval
   npm test
   npm build
      │           │
      └─────┬─────┘
            ▼
          main 🔒
```

---

## Ветки

Работа выполняется не непосредственно в `main`, а в отдельных ветках.

Формат имени ветки:

```text
<type>/<description>
```

или:

```text
<type>/<issue-number>-<description>
```

Примеры:

```text
feat/add-login
feat/117-add-login
fix/mobile-layout
chore/update-dependencies
docs/update-readme
test/add-router-tests
```

Используемые типы:

```text
build
chore
ci
docs
feat
fix
perf
refactor
revert
style
test
experiment
```

Название ветки проверяется через `validate-branch-name`.

---

## Commitlint

Сообщения коммитов проверяются через `commitlint`.

Используется Conventional Commits.

Примеры:

```text
feat: add login form
fix: correct mobile layout
docs: update README
test: add router tests
refactor: simplify router logic
chore: update dependencies
ci: configure GitHub Actions
```

Общий формат:

```text
<type>: <description>
```

Проверка выполняется автоматически через Husky перед созданием коммита.

---

## Pre-commit

Перед каждым коммитом Husky запускает `lint-staged`.

Проверяются только изменённые и staged-файлы.

Выполняются:

```text
ESLint
Prettier
```

Это позволяет автоматически исправлять форматирование и часть проблем линтинга до создания коммита.

---

## Pre-push

Перед `git push` выполняется проверка имени текущей ветки.

```bash
npx validate-branch-name
```

Если название ветки не соответствует правилам, push блокируется.

---

## GitHub Actions

Workflow называется:

```text
CI
```

Он запускается:

- при push в `main`;
- при создании или обновлении Pull Request.

Основной job:

```text
test
```

Последовательно выполняются:

```bash
npm ci
npm run lint
npm test
npm run build
```

Все четыре проверки должны завершиться успешно.

---

## Почему `npm test` не падает без тестов

Starter может использоваться для нового проекта, в котором тестов ещё нет.

Поэтому команда настроена как:

```json
"test": "vitest run --passWithNoTests"
```

Отдельно можно запустить watch mode:

```bash
npm run test:watch
```

Таким образом:

```text
npm test
        ↓
однократный запуск
        ↓
подходит для CI
```

```text
npm run test:watch
        ↓
watch mode
        ↓
локальная разработка
```

---

# Защита `main`

Для `main` создан GitHub Ruleset.

Ruleset действует на ветку:

```text
main
```

Enforcement:

```text
Active
```

Bypass list:

```text
Empty
```

Это означает, что никто не может просто обойти установленные правила.

---

## Установленные правила

### Require pull request before merging

Изменения должны попадать в `main` через Pull Request.

Прямой push в `main` запрещён правилами workflow.

---

### Require status checks to pass

Перед merge должен успешно пройти CI.

Required check:

```text
test
```

Он проверяет:

```text
npm ci
npm run lint
npm test
npm run build
```

---

### Require branches to be up to date

Перед merge ветка должна содержать актуальное состояние `main`.

Если `main` изменился после создания PR, ветку необходимо обновить и снова пройти проверки.

---

### Require approvals

Для Pull Request требуется approval.

В текущем учебном ruleset установлено:

```text
Required approvals: 1
```

Это сделано намеренно для изучения командного workflow.

В одиночном репозитории это ограничение может оказаться неудобным, поскольку автор PR не может самостоятельно approve собственный PR.

Если starter используется как личный шаблон, количество обязательных approvals можно изменить.

---

### Dismiss stale approvals

После новых изменений старые approvals могут быть сброшены.

Это предотвращает ситуацию, когда изменения были внесены после review, но старое одобрение всё ещё считается действительным.

---

### Require conversation resolution

Перед merge все обсуждения в Pull Request должны быть разрешены.

Это заставляет закрыть замечания и вопросы review перед слиянием.

---

### Restrict deletions

Защищает `main` от удаления.

---

### Block force pushes

Запрещает:

```bash
git push --force
```

в защищённую ветку.

Это предотвращает переписывание истории `main`.

---

# Что пока не используется

Некоторые возможности GitHub сознательно не включены.

### Signed commits

Не используются.

Подпись коммитов — отдельная тема, связанная с GPG/SSH signing и verified commits.

---

### Require deployments to succeed

Не используется.

Vercel был протестирован отдельно, но deployment пока не является обязательной частью workflow starter pack.

---

### Code scanning

Не используется.

Для проекта пока не настроен отдельный security/code-scanning workflow.

---

### Code quality

Не используется.

Отдельный анализ качества кода пока не настроен.

---

### Code coverage

Не используется.

Тестов в starter может не быть, поэтому требовать минимальное покрытие сейчас бессмысленно.

---

### Merge queue

Не используется.

Очередь слияния полезнее в проектах с большим количеством одновременно открытых Pull Request.

---

### Linear history

Не используется.

Обычная история Git пока предпочтительнее для обучения работе с ветками и merge.

---

# Типичный рабочий процесс

Создать ветку:

```bash
git checkout -b feat/add-feature
```

Работать и коммитить:

```bash
git add .
git commit -m "feat: add feature"
```

Отправить ветку:

```bash
git push -u origin feat/add-feature
```

Создать Pull Request на GitHub.

После этого GitHub запускает CI:

```text
npm ci
npm run lint
npm test
npm run build
```

После успешного CI и выполнения требований ruleset PR можно слить в `main`.

---

## Получившийся workflow

```text
1. Создать ветку
        ↓
2. Разрабатывать
        ↓
3. Commitlint
        ↓
4. Pre-commit
        ↓
5. Push
        ↓
6. Branch validation
        ↓
7. Pull Request
        ↓
8. GitHub Actions
        ↓
9. Review / Approval
        ↓
10. Merge
        ↓
11. main
```

Таким образом, локальные проверки, CI и правила GitHub работают как единая система.
