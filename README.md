
# 🌐 @erag/lang-sync-inertia

### **Unified Language Helper for Vue & React (Inertia.js + Laravel)**

`@erag/lang-sync-inertia` is a lightweight frontend library for handling multilingual translation strings shared from Laravel via Inertia.js.
It supports **Vue 3** and **React 18**, offering an easy-to-use `useLang()` hook/composable.

This package is built to work **perfectly** with its Laravel backend package:

---

# 🔗 **Server-Side Package (Laravel Integration Required)**

The translations used by this frontend package are provided by the Laravel package:

### 👉 **erag/laravel-lang-sync-inertia**

Packagist: [https://packagist.org/packages/erag/laravel-lang-sync-inertia](https://packagist.org/packages/erag/laravel-lang-sync-inertia)
GitHub: [https://github.com/eramitgupta/laravel-lang-sync-inertia](https://github.com/eramitgupta/laravel-lang-sync-inertia)

Install in Laravel:

```bash
composer require erag/laravel-lang-sync-inertia
```

This Laravel package:

* Loads language files from `resources/lang/*`
* Syncs them into Inertia shared props
* Provides `syncLangFiles()` helper
* Automatically injects translation data into Vue/React

**⚠️ Important:**
Frontend package (`@erag/lang-sync-inertia`) will not receive translation data unless this Laravel package is installed.

---

## ✨ Features

* 🚀 Framework-agnostic — works with **both Vue & React**
* 🔄 Supports dynamic placeholders → `{name}`, `{email}` etc.
* 🌍 Works directly with Laravel’s language files
* ⚡ Extremely lightweight & fast
* 🎯 Simple API: `trans()` and `__()`
* 🧵 Typescript support (strict typing)
* 🔌 Auto-loaded via Inertia shared props

---

## 📦 Installation

```bash
npm install @erag/lang-sync-inertia
```

---

## 🧩 Usage (Vue 3)

### Import & Use

```ts
import { VueLang } from '@erag/lang-sync-inertia'

const { trans, __ } = VueLang.useLang()
```

### Example in Vue Component

```vue
<template>
    <div>
        <h1>{{ __('auth.greeting') }}</h1>
        <p>{{ trans('auth.welcome', { name: 'Amit' }) }}</p>
    </div>
</template>

<script setup lang="ts">
import { VueLang } from '@erag/lang-sync-inertia'

const { trans, __ } = VueLang.useLang()
</script>
```

---

## 🧩 Usage (React)

### Import & Use

```ts
import { ReactLang } from '@erag/lang-sync-inertia'

const { trans, __ } = ReactLang.useLang()
```

### Example in React Component

```tsx
import { ReactLang } from '@erag/lang-sync-inertia'

export default function Login() {
    const { trans, __ } = ReactLang.useLang()

    return (
        <div>
            <h1>{__('auth.greeting')}</h1>
            <p>{trans('auth.welcome', { name: 'Amit' })}</p>
        </div>
    )
}
```

---

## 🔧 How `trans()` and `__()` work

### ✔ Basic usage

```ts
__('auth.greeting')
// "Hello!"
```

### ✔ With placeholders

```ts
trans('auth.welcome', { name: 'Amit' })
// "Welcome, Amit!"
```

### ✔ With plain string

```ts
__('auth.welcome', 'Developer')
// "Welcome, {name}! Developer"
```

---

## 🗂 Laravel Example (Backend Must Provide Data)

Your Laravel controller must load language files using:

```php
syncLangFiles(['auth', 'validation']);
```

This automatically makes translation data available in:

```
page.props.lang
```

---

## 📁 Laravel Language File Example

`resources/lang/en/auth.php`

```php
return [
    'greeting' => 'Hello!',
    'welcome' => 'Welcome, {name}!',
];
```

---

## 🧠 Type Definitions

```ts
type Replaces = Record<string, string | number>
type LangValue = string | { [key: string]: string | LangValue }
type LangObject = Record<string, LangValue>
```

---

## 🏗 Internal Structure

```
src/
├─ types/
│   └─ lang.ts
├─ vue/
│   └─ useLang.ts
├─ react/
│   └─ useLang.ts
└─ index.ts
```

Exports:

```ts
export * as VueLang from './vue/useLang'
export * as ReactLang from './react/useLang'
```

---

## 📦 Build Tools

This library is built with:

* Rollup
* rollup-plugin-typescript2
* @rollup/plugin-node-resolve
* @rollup/plugin-commonjs
* TypeScript

---

## 🤝 Contributing

Pull requests are welcome!
Feel free to open an issue if you find a bug or want to request a feature.

---

## 📄 License

MIT © Amit Gupta (erag)

