# 🌐 **@erag/lang-sync-inertia**

### **Unified Translation Helper for Vue & React (Inertia.js + Laravel)**

`@erag/lang-sync-inertia` is a lightweight multilingual translation helper for
**Inertia.js (Vue 3 / React)** applications.

It works as a frontend companion for the Laravel backend package:

➡️ **erag/laravel-lang-sync-inertia**

It gives you a clean API to access:

```
page.props.lang
```

through:

* `vueLang()` — for Vue 3
* `reactLang()` — for React

---

## 🔗 **Required Laravel Package (Backend Integration)**

You must install the Laravel backend package to send translations:

### 👉 `erag/laravel-lang-sync-inertia`

Packagist:
[https://packagist.org/packages/erag/laravel-lang-sync-inertia](https://packagist.org/packages/erag/laravel-lang-sync-inertia)

GitHub:
[https://github.com/eramitgupta/laravel-lang-sync-inertia](https://github.com/eramitgupta/laravel-lang-sync-inertia)

Install:

```bash
composer require erag/laravel-lang-sync-inertia
```

---

# ✨ Features

* 🚀 Works with **Vue 3** and **React 18/19**
* 🔄 Placeholder replacement → `{name}`
* 📦 Super lightweight (~1 KB gzipped)
* 🎯 Clean API → `trans()` & `__()`
* 🧵 TypeScript support
* 🌍 Uses Laravel translation system
* 💡 Supports nested translations (`auth.errors.required`)

---

# 📦 Installation

```bash
npm install @erag/lang-sync-inertia
```

---

# 🧩 Vue 3 Usage (Inertia.js + Vite)

### ⭐ Import

```ts
import { vueLang } from '@erag/lang-sync-inertia'

const { trans, __ } = vueLang()
```

### Component Example

```vue
<script setup lang="ts">
import { vueLang } from '@erag/lang-sync-inertia'

const { trans, __ } = vueLang()
</script>

<template>
    <h1>{{ __('auth.greeting') }}</h1>
    <p>{{ trans('auth.welcome', { name: 'Amit' }) }}</p>
</template>
```

---

# 🧩 React Usage (Inertia.js + React)

### ⭐ Import

```ts
import { reactLang } from '@erag/lang-sync-inertia'
```

### Component Example

```tsx
import { reactLang } from '@erag/lang-sync-inertia'

export default function Login() {
    const { trans, __ } = reactLang()

    return (
        <div>
            <h1>{__('auth.greeting')}</h1>
            <p>{trans('auth.welcome', { name: 'Amit' })}</p>
        </div>
    )
}
```

---

# 🔧 API Reference

### `__(key: string, replaces?: string | object)`

Simple translation usage:

```ts
__('auth.login')
```

### `trans(key: string, replaces: object)`

Replaces placeholders:

```ts
trans('auth.welcome', { name: 'Amit' })
// "Welcome, Amit!"
```

---

# 🗂 Laravel Usage Example

### Controller

```php
syncLangFiles(['auth', 'dashboard']);
return Inertia::render('Dashboard');
```

### Language File: `resources/lang/en/auth.php`

```php
return [
    'greeting' => 'Hello!',
    'welcome'  => 'Welcome, {name}!',
];
```

---

# 🧠 Provided Types

```ts
type Replaces = Record<string, string | number>
type LangValue = string | { [key: string]: string | LangValue }
type LangObject = Record<string, LangValue>
```

---

# 📁 Structure

```
src/
├─ vue/
├─ react/
├─ types/
└─ index.ts
```

---

# 📄 License

MIT © Amit Gupta

---
