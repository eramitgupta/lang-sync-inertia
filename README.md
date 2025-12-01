# 🌐 **erag-lang-sync-inertia**

### **Unified Translation Helper for Vue & React (Inertia.js + Laravel)**

`erag-lang-sync-inertia` is a lightweight multilingual translation helper for **Inertia.js (Vue 3 / React)** applications.
It works as a frontend companion for the Laravel backend package:

➡️ **erag/laravel-lang-sync-inertia**

and allows you to access:

```
page.props.lang
```

using a clean `useLang()` hook.

---

# 🔗 **Required Laravel Package (Backend Integration)**

Translations must be sent from the backend using:

### 👉 **erag/laravel-lang-sync-inertia**

Packagist:
[https://packagist.org/packages/erag/laravel-lang-sync-inertia](https://packagist.org/packages/erag/laravel-lang-sync-inertia)

GitHub:
[https://github.com/eramitgupta/laravel-lang-sync-inertia](https://github.com/eramitgupta/laravel-lang-sync-inertia)

Install in Laravel:

```bash
composer require erag/laravel-lang-sync-inertia
```

This backend package:

* Loads PHP translation files from `resources/lang/{locale}`
* Converts them to JSON
* Shares them via Inertia (`page.props.lang`)
* Provides `syncLangFiles()` helper

---

# ✨ Features

* 🚀 Works with **Vue 3** and **React 18/19**
* 🔄 Dynamic placeholder replacement → `{name}`
* ⚡ Minimal & fast (only ~1 KB gzipped)
* 🎯 Simple API → `trans()` and `__()`
* 🧠 TypeScript support
* 🌍 Uses Laravel's built-in lang system
* 💡 Supports deeply nested translation keys

---

# 📦 Installation

```bash
npm install erag-lang-sync-inertia
```

---

# 🧩 Usage (Vue 3 + Inertia.js)

### Import

```ts
import { useLang } from 'erag-lang-sync-inertia/vue'

const { trans, __ } = useLang()
```

### Example in component

```vue
<template>
    <div>
        <h1>{{ __('auth.greeting') }}</h1>
        <p>{{ trans('auth.welcome', { name: 'Amit' }) }}</p>
    </div>
</template>

<script setup lang="ts">
import { useLang } from 'erag-lang-sync-inertia/vue'

const { trans, __ } = useLang()
</script>
```

---

# 🧩 Usage (React + Inertia.js)

### Import

```ts
import { useLang } from 'erag-lang-sync-inertia/react'

const { trans, __ } = useLang()
```

### Example component

```tsx
import { useLang } from 'erag-lang-sync-inertia/react'

export default function Login() {
    const { trans, __ } = useLang()

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

Simple translation lookup.

```ts
__('auth.login')
```

### `trans(key: string, replaces: object)`

Replaces `{placeholders}` automatically.

```ts
trans('auth.welcome', { name: 'Amit' })
```

### Placeholder Example

```
"welcome" => "Welcome, {name}!"
```

Output:

```ts
trans('auth.welcome', { name: 'Amit' })
// "Welcome, Amit!"
```

---

# 🗂 Laravel Usage Example (Backend)

### Controller

```php
syncLangFiles(['auth', 'dashboard']);

return Inertia::render('Dashboard');
```

### Language file

`resources/lang/en/auth.php`

```php
return [
    'greeting' => 'Hello!',
    'welcome'  => 'Welcome, {name}!',
];
```

These become available inside Inertia:

```
page.props.lang.auth.greeting
page.props.lang.auth.welcome
```

---

# 🧠 Types Provided

```ts
type Replaces = Record<string, string | number>
type LangValue = string | { [key: string]: string | LangValue }
type LangObject = Record<string, LangValue>
```

---

# 📁 Internal Structure

```
src/
├─ vue/
│   └─ useLang.ts
├─ react/
│   └─ useLang.ts
├─ types/
│   └─ lang.ts
│   └─ page.ts
└─ index.ts
```

Exports:

```ts
import { useLang } from 'erag-lang-sync-inertia/vue'
import { useLang } from 'erag-lang-sync-inertia/react'
```

---

# 🛠 Build Tools

* Rollup
* TypeScript
* rollup-plugin-typescript2
* @rollup/plugin-node-resolve
* @rollup/plugin-commonjs

---

# 🤝 Contributing

PRs and issues are welcome!

---

# 📄 License

MIT © Amit Gupta