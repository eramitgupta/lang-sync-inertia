# 🌐 **erag-lang-sync-inertia**

### **Unified Translation Helper for Vue & React (Inertia.js + Laravel)**

`erag-lang-sync-inertia` is a lightweight multilingual translation helper for
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

# 🔗 **Required Laravel Package (Backend Integration)**

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

This backend package:

✔ Loads language files from `resources/lang/{locale}`
✔ Converts them to JSON
✔ Injects them into Inertia shared props
✔ Provides `syncLangFiles()` helper

---

# ✨ Features

* 🚀 Works with **Vue 3** and **React 18/19**
* 🔄 Supports placeholder replacement → `{name}`
* 📦 Only ~1 KB gzipped → very lightweight
* 🎯 Clean API → `trans()` & `__()`
* 🧵 TypeScript support
* 🌍 Uses Laravel translation system
* 💡 Supports nested translations (`auth.errors.required`)

---

# 📦 Installation

```bash
npm install erag-lang-sync-inertia
```

---

# 🧩 Vue 3 Usage (Inertia.js + Vite)

### ⭐ Recommended Import

```ts
import { vueLang } from 'erag-lang-sync-inertia'

const { trans, __ } = vueLang()
```

### ⭐ Example Component

```vue
<script setup lang="ts">
import { vueLang } from 'erag-lang-sync-inertia'

const { trans, __ } = vueLang()
</script>

<template>
    <h1>{{ __('auth.greeting') }}</h1>
    <p>{{ trans('auth.welcome', { name: 'Amit' }) }}</p>
</template>
```

---

# 🧩 React Usage (Inertia.js + React)

### ⭐ Recommended Import

```ts
import { reactLang } from 'erag-lang-sync-inertia'

const { trans, __ } = reactLang()
```

### ⭐ Example Component

```tsx
import { reactLang } from 'erag-lang-sync-inertia'

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

Simple translation lookup:

```ts
__('auth.login')
```

### `trans(key: string, replaces: object)`

Replaces placeholders:

```ts
trans('auth.welcome', { name: 'Amit' })
// "Welcome, Amit!"
```

### Placeholder Example (Laravel)

```
"welcome" => "Welcome, {name}!"
```

---

# 🗂 Laravel Usage Example (Backend)

### Controller

```php
syncLangFiles(['auth', 'dashboard']);

return Inertia::render('Dashboard');
```

### Language File

`resources/lang/en/auth.php`:

```php
return [
    'greeting' => 'Hello!',
    'welcome'  => 'Welcome, {name}!',
];
```

Now in Inertia:

```
page.props.lang.auth.greeting
page.props.lang.auth.welcome
```

---

# 🧠 Provided Types

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
│   ├─ useLang.ts
│   └─ index.ts  (exports vueLang)
├─ react/
│   ├─ useLang.ts
│   └─ index.ts  (exports reactLang)
├─ types/
│   ├─ lang.ts
│   └─ page.ts
└─ index.ts
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

PRs and issues welcome!

---

# 📄 License

MIT © Amit Gupta