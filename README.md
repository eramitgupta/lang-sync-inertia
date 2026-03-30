# @erag/lang-sync-inertia

**Unified translation helper for Vue 3 & React with Inertia.js + Laravel.**

A lightweight (~1 KB gzipped) frontend companion to [`erag/laravel-lang-sync-inertia`](https://packagist.org/packages/erag/laravel-lang-sync-inertia) that exposes Laravel's translation system directly inside your Inertia components via a clean, consistent API.

---

## Features

- Works with **Vue 3** and **React 18/19**
- Clean API: `trans()` and `__()`
- Placeholder replacement via `{name}` syntax
- Nested key support: `auth.errors.required`
- Full **TypeScript** support
- Super lightweight (~1 KB gzipped)
- Built on Laravel's translation system via `page.props.lang`

---

## Requirements

This package requires the Laravel backend package to share translations with the frontend:

```bash
composer require erag/laravel-lang-sync-inertia
```

- Packagist: [erag/laravel-lang-sync-inertia](https://packagist.org/packages/erag/laravel-lang-sync-inertia)
- GitHub: [eramitgupta/laravel-lang-sync-inertia](https://github.com/eramitgupta/laravel-lang-sync-inertia)

---

## Installation

```bash
npm install @erag/lang-sync-inertia
```

---

## Usage

### Vue 3

```ts
import { lang } from '@erag/lang-sync-inertia/vue'

const { trans, __ } = lang()
```

**Component example:**

```vue
<script setup lang="ts">
import { lang } from '@erag/lang-sync-inertia/vue'

const { trans, __ } = lang()
</script>

<template>
  <h1>{{ __('auth.greeting') }}</h1>
  <p>{{ trans('auth.welcome', { name: 'Amit' }) }}</p>
</template>
```

---

### React

```ts
import { lang } from '@erag/lang-sync-inertia/react'

const { trans, __ } = lang()
```

**Component example:**

```tsx
import { lang } from '@erag/lang-sync-inertia/react'

export default function Login() {
  const { trans, __ } = lang()

  return (
    <div>
      <h1>{__('auth.greeting')}</h1>
      <p>{trans('auth.welcome', { name: 'Amit' })}</p>
    </div>
  )
}
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
```

### `trans(key, replaces)`

Alias of `__()` with explicit replacement object — preferred when placeholders are always present.

```ts
trans('auth.welcome', { name: 'Amit' })
// → "Welcome, Amit!"
```

---

## Laravel Integration

### Controller

```php
syncLangFiles(['auth', 'dashboard']);
return Inertia::render('Dashboard');
```

### Language file — `resources/lang/en/auth.php`

```php
return [
    'greeting' => 'Hello!',
    'welcome'  => 'Welcome, {name}!',
];
```

The package reads from `page.props.lang` automatically — no extra setup needed on the frontend.

---

## TypeScript Types

```ts
type Replaces  = Record<string, string | number>
type LangValue = string | { [key: string]: string | LangValue }
type LangObject = Record<string, LangValue>
```

---

## Backward Compatibility

The legacy APIs still work and are not deprecated:

```ts
// Vue
import { vueLang } from '@erag/lang-sync-inertia'
const { trans, __ } = vueLang()

// React
import { reactLang } from '@erag/lang-sync-inertia'
const { trans, __ } = reactLang()
```

The `lang()` import from the framework-specific path (`/vue` or `/react`) is now the recommended style.

---

## Package Structure

```
src/
├── vue/
├── react/
├── types/
└── index.ts
```

---

## License

MIT © [Amit Gupta](https://github.com/eramitgupta)
