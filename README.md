# @erag/lang-sync-inertia

**Sync Laravel translations with Inertia.js for Vue 3, React, and Svelte.**

A lightweight frontend companion to [`eramitgupta/laravel-lang-sync-inertia`](https://github.com/eramitgupta/laravel-lang-sync-inertia). It reads translations shared through Inertia's `page.props.lang` and provides consistent, type-safe helpers for lookups, nested keys, placeholders, pluralization, and locale-aware updates.

---

## Features

- 🔄 **Laravel sync** with `syncLangFiles()` to share selected language files through Inertia
- 🧩 **Vue 3, React 18/19, and Svelte 5** helpers from one package root
- 🌍 **Locale-aware loading** from Laravel's active `lang/{locale}` directory
- 📁 **Single, multiple, and nested files** with dot notation such as `admin.auth`
- ⚡ **Shared translations** available through Inertia's reactive `page.props.lang`
- 🛠️ **Translation helpers**: `__()`, `trans()`, `transChoice()`, and `trans_choice()`
- 📝 **Laravel placeholders** with both `:name` and legacy `{name}` syntax
- 🔢 **Pluralization** with exact values and Laravel intervals such as `{0}`, `{1}`, and `[2,*]`
- ↩️ **Direct string keys** with fallback to the original key when a translation is missing
- 📦 **JSON export** from PHP language files for frontend-ready static translations
- ✅ **TypeScript support** with typed helpers and a lightweight runtime

---

## Requirements

This package requires the Laravel backend package to share translations with the frontend:

```bash
composer require erag/laravel-lang-sync-inertia
```

- Backend GitHub: [eramitgupta/laravel-lang-sync-inertia](https://github.com/eramitgupta/laravel-lang-sync-inertia)
- Frontend GitHub: [eramitgupta/lang-sync-inertia](https://github.com/eramitgupta/lang-sync-inertia)
- Documentation: [Laravel Lang Sync Inertia](https://eramitgupta.github.io/laravel-lang-sync-inertia/)

---

## Installation

```bash
npm install @erag/lang-sync-inertia
```

---

## Usage

### Vue 3

```ts
import { vueLang } from '@erag/lang-sync-inertia'

const { trans, __, transChoice } = vueLang()
```

**Component example:**

```vue
<script setup lang="ts">
import { vueLang } from '@erag/lang-sync-inertia'

const { trans, __, transChoice } = vueLang()
</script>

<template>
  <h1>{{ __('auth.greeting') }}</h1>
  <p>{{ trans('auth.welcome', { name: 'Amit' }) }}</p>
  <p>{{ transChoice('auth.apples', 3) }}</p>
</template>
```

---

### React

```ts
import { reactLang } from '@erag/lang-sync-inertia'

const { trans, __, transChoice } = reactLang()
```

**Component example:**

```tsx
import { reactLang } from '@erag/lang-sync-inertia'

export default function Login() {
  const { trans, __, transChoice } = reactLang()

  return (
    <div>
      <h1>{__('auth.greeting')}</h1>
      <p>{trans('auth.welcome', { name: 'Amit' })}</p>
      <p>{transChoice('auth.apples', 3)}</p>
    </div>
  )
}
```

---

### Svelte

Requires `@inertiajs/svelte` v3 (Svelte 5).

```ts
import { svelteLang } from '@erag/lang-sync-inertia'

const { trans, __, transChoice } = svelteLang()
```

**Component example:**

```svelte
<script module lang="ts">
import { svelteLang } from '@erag/lang-sync-inertia'

const { trans, __, transChoice } = svelteLang()
</script>

<h1>{__('auth.greeting')}</h1>
<p>{trans('auth.welcome', { name: 'Amit' })}</p>
<p>{transChoice('auth.apples', 3)}</p>
```

---

## API Reference

### `__(key, replaces?)`

Translates a key, with optional placeholder replacement.

```ts
__('auth.login')
// → "Login"

__('auth.welcome', { name: 'Amit' })
// → "Welcome, Amit!"

__('messages.greeting.welcome_with_message', {
  name: 'Amit',
  message: 'Good to see you'
})
// lang/en/messages.php → ['greeting' => ['welcome_with_message' => 'Welcome, :name. :message']]
// → "Welcome, Amit. Good to see you"
```

If no matching translation key is found, the original key is returned unchanged:

```ts
__('I love programming.')
// → "I love programming."
```

Laravel key example:

```php
return [
    'greeting' => [
        'name' => 'Welcome, :name',
        'welcome_with_message' => 'Welcome, :name. :message',
        'legacy_welcome' => 'Welcome, {name}',
    ],
];
```

```ts
__('messages.greeting.name', { name: 'dayle' })
// → "Welcome, dayle"

trans('messages.greeting.welcome_with_message', {
  name: 'dayle',
  message: 'Good to see you'
})
// → "Welcome, dayle. Good to see you"
```

Keys containing literal dots — such as English sentences used as translation keys — are supported. A direct lookup is attempted before dot-notation traversal, so they resolve correctly:

```ts
// lang/en/messages.php → ['Please proceed with caution, this cannot be undone.' => '...']
__('Please proceed with caution, this cannot be undone.')
// → "..."
```

### `trans(key, replaces)`

Alias of `__()` with explicit replacement object — preferred when placeholders are always present.

```ts
trans('auth.welcome', { name: 'Amit' })
// → "Welcome, Amit!"
```

### `transChoice(key, count, replaces?)`

Translates a pluralized key using Laravel-style pluralization strings. The `trans_choice()` alias is also available.

```ts
transChoice('auth.apples', 1)
// → "There is one apple"

transChoice('auth.apples', 5)
// → "There are 5 apples"

trans_choice('auth.notifications', 0)
// → "No notifications"

trans_choice('auth.notifications', 3)
// → "3 notifications"
```

Laravel language file example:

```php
return [
    'apples' => 'There is one apple|There are :count apples',
    'notifications' => '{0} No notifications|{1} One notification|[2,*] :count notifications',
];
```

---

## Laravel Integration

### Controller

```php
syncLangFiles(['auth', 'dashboard']);
return Inertia::render('Dashboard');
```

Nested language directories can be referenced from Laravel with dot notation:

```php
syncLangFiles('admin.users');

return Inertia::render('Admin/Users/Index');
```

For a file like `lang/en/admin/users.php`, use the full nested key path on the frontend:

```ts
__('admin.users.name')
```

### Language file — `resources/lang/en/auth.php`

```php
return [
    'greeting' => 'Hello!',
    'welcome'  => 'Welcome, :name',
    'apples'   => 'There is one apple|There are :count apples',
];
```

The package reads from `page.props.lang` automatically — no extra setup needed on the frontend.

---

## TypeScript Types

```ts
type Replaces = Record<string, string | number>
type LangValue = string | { [key: string]: string | LangValue }
type LangObject = Record<string, LangValue>
```

---

## API Entry Points

Use the framework-specific helper from the package root:

```ts
// Vue
import { vueLang } from '@erag/lang-sync-inertia'
const { trans, __ } = vueLang()

// React
import { reactLang } from '@erag/lang-sync-inertia'
const { trans, __ } = reactLang()

// Svelte
import { svelteLang } from '@erag/lang-sync-inertia'
const { trans, __ } = svelteLang()
```

The legacy `lang()` imports from the framework-specific paths (`/vue`, `/react`, or `/svelte`) remain supported for backward compatibility.

---

## Package Structure

```
src/
├── vue/
├── react/
├── svelte/
├── types/
└── index.ts
```

---

[Code of Conduct](CODE_OF_CONDUCT.md) · [Contributing](CONTRIBUTING.md) · [Security Policy](SECURITY.md)

---

## License

MIT © [Amit Gupta](https://github.com/eramitgupta)
