import assert from 'node:assert/strict'
import test from 'node:test'
import { createLang } from '../dist/core/translator.js'

const lang = createLang(() => ({
  auth: {
    greeting: 'Hello, :name',
    legacyGreeting: 'Welcome, {name}',
    apples: '{0} No apples|{1} One apple|[2,*] :count apples'
  },
  'literal.key': 'Literal key value'
}))

test('translates nested keys and replaces placeholders', () => {
  assert.equal(lang.trans('auth.greeting', { name: 'Amit' }), 'Hello, Amit')
  assert.equal(lang.__('auth.legacyGreeting', { name: 'Amit' }), 'Welcome, Amit')
})

test('keeps unresolved placeholders and supports string replacements', () => {
  assert.equal(lang.trans('auth.greeting'), 'Hello, :name')
  assert.equal(lang.trans('auth.greeting', 'Amit'), 'Hello, :name Amit')
})

test('prioritizes literal-dot keys over nested traversal', () => {
  assert.equal(lang.trans('literal.key'), 'Literal key value')
  assert.equal(lang.trans('missing.key'), 'missing.key')
})

test('supports exact and interval pluralization', () => {
  assert.equal(lang.transChoice('auth.apples', 0), 'No apples')
  assert.equal(lang.transChoice('auth.apples', 1), 'One apple')
  assert.equal(lang.transChoice('auth.apples', 5), '5 apples')
  assert.equal(lang.trans_choice('auth.apples', 3), '3 apples')
})

for (const [label, dictionary] of [
  ['undefined dictionary', undefined],
  ['empty dictionary', {}],
  ['missing keys', { other: 'Translated' }]
]) {
  test(`replaces placeholders in fallback text with ${label}`, () => {
    const fallback = createLang(() => dictionary)

    assert.equal(
      fallback.__(':browser on :platform', { browser: 'Chrome', platform: 'Linux' }),
      'Chrome on Linux'
    )
    assert.equal(fallback.trans('Last active :time', { time: 'Nov 9' }), 'Last active Nov 9')
    assert.equal(
      fallback.trans('{name}: :count :unknown', { name: 'Amit', count: 0 }),
      'Amit: 0 :unknown'
    )
    assert.equal(fallback.trans('Hello, :name'), 'Hello, :name')
    assert.equal(fallback.trans('Hello', 'Amit'), 'Hello Amit')
    assert.equal(fallback.trans('missing.key'), 'missing.key')
  })

  test(`pluralizes fallback text with ${label}`, () => {
    const fallback = createLang(() => dictionary)
    const key = '{0} No apples|{1} One apple|[2,*] :count apples for {name}'

    assert.equal(fallback.transChoice(key, 0), 'No apples')
    assert.equal(fallback.transChoice(key, 1), 'One apple')
    assert.equal(fallback.transChoice(key, 5, { name: 'Amit' }), '5 apples for Amit')
    assert.equal(fallback.trans_choice(':count / {value}', 3), '3 / 3')
    assert.equal(fallback.transChoice(':count / :value', 3, { value: 9 }), '3 / 9')
    assert.equal(fallback.transChoice('missing.key', 3), 'missing.key')
  })
}

test('preserves empty translations instead of falling back to the key', () => {
  const empty = createLang(() => ({ 'Hello :name': '' }))

  assert.equal(empty.trans('Hello :name', { name: 'Amit' }), '')
  assert.equal(empty.transChoice('Hello :name', 2), '')
})
