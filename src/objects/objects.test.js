import { describe, expect, it, test } from 'vitest'
import {
  accessPropertiesInObjects,
  createUserObject,
  iteratesThroughObjectValuesAndProperties,
  parseJavaScriptObjectNotation,
  retrieveMaximumMinimumUserAges,
  stringifyJavaScriptObjectNotation,
} from './objects.js'

describe('Object creation :', () => {
  it('Should return an object with a "first_name" property', () => {
    expect(createUserObject()).toHaveProperty('first_name')
  })

  it('Should return an object with a "last_name" property', () => {
    expect(createUserObject()).toHaveProperty('last_name')
  })

  it('first_name should be "Toto"', () => {
    expect(createUserObject().first_name).toBe('Toto')
  })

  it('last_name should be "Tutu"', () => {
    expect(createUserObject().last_name).toBe('Tutu')
  })

  it('Should return a plain object (not an array, string, etc.)', () => {
    expect(typeof createUserObject()).toBe('object')
    expect(Array.isArray(createUserObject())).toBe(false)
  })
})

describe('Access properties :', () => {
  it('Should return first_name and last_name joined with a space', () => {
    expect(
      accessPropertiesInObjects({ first_name: 'Toto', last_name: 'Tutu' }),
    ).toBe('Toto Tutu')
  })

  it('Should work with different values', () => {
    expect(
      accessPropertiesInObjects({ first_name: 'Tata', last_name: 'Titi' }),
    ).toBe('Tata Titi')
    expect(
      accessPropertiesInObjects({ first_name: 'Tutu', last_name: 'Tata' }),
    ).toBe('Tutu Tata')
  })

  it('Should return a string, not an array or object', () => {
    expect(
      typeof accessPropertiesInObjects({
        first_name: 'A',
        last_name: 'B',
      }),
    ).toBe('string')
  })
})

describe('Iterates through keys and properties :', () => {
  it('Should return keys mapped to uppercase', () => {
    const result = iteratesThroughObjectValuesAndProperties({ key: 'Value' })
    expect(result.keys).toStrictEqual(['KEY'])
  })

  it('Should return values mapped to lowercase', () => {
    const result = iteratesThroughObjectValuesAndProperties({ key: 'Value' })
    expect(result.values).toStrictEqual(['value'])
  })

  it('Should handle an object with multiple properties', () => {
    expect(
      iteratesThroughObjectValuesAndProperties({
        first_name: 'Toto',
        last_name: 'Tutu',
      }),
    ).toStrictEqual({
      keys: ['FIRST_NAME', 'LAST_NAME'],
      values: ['toto', 'tutu'],
    })
  })

  it('Should handle an object with already-uppercase keys and lowercase values', () => {
    expect(
      iteratesThroughObjectValuesAndProperties({ NAME: 'alice' }),
    ).toStrictEqual({
      keys: ['NAME'],
      values: ['alice'],
    })
  })

  it('Should return an object with exactly two properties: "keys" and "values"', () => {
    const result = iteratesThroughObjectValuesAndProperties({ a: 'B' })
    expect(Object.keys(result)).toStrictEqual(['keys', 'values'])
  })
})

describe('Find older and younger :', () => {
  test('Should find the younger and older user in a list', () => {
    expect(
      retrieveMaximumMinimumUserAges([
        { name: 'Toto', age: 20 },
        { name: 'Tata', age: 18 },
        { name: 'Titi', age: 28 },
        { name: 'Tutu', age: 32 },
      ]),
    ).toStrictEqual({
      younger: 'Tata',
      older: 'Tutu',
    })
  })

  test('When multiple users share the same min/max age, return the first match', () => {
    expect(
      retrieveMaximumMinimumUserAges([
        { name: 'Toto', age: 20 },
        { name: 'Tim', age: 18 },
        { name: 'Tata', age: 18 },
        { name: 'Titi', age: 28 },
        { name: 'Tutu', age: 32 },
        { name: 'Tom', age: 32 },
      ]),
    ).toStrictEqual({
      younger: 'Tim',
      older: 'Tom',
    })
  })

  test('Should work with only two users', () => {
    expect(
      retrieveMaximumMinimumUserAges([
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 30 },
      ]),
    ).toStrictEqual({
      younger: 'Alice',
      older: 'Bob',
    })
  })

  test('Must not modify the original array (immutability)', () => {
    const users = [
      { name: 'Toto', age: 20 },
      { name: 'Tata', age: 18 },
      { name: 'Tutu', age: 32 },
    ]
    retrieveMaximumMinimumUserAges(users)
    expect(users).toStrictEqual([
      { name: 'Toto', age: 20 },
      { name: 'Tata', age: 18 },
      { name: 'Tutu', age: 32 },
    ])
    expect(users).toHaveLength(3)
  })
})

describe('Work with JSON', () => {
  test('Parse a simple JSON string into an object', () => {
    expect(parseJavaScriptObjectNotation('{"name":"toto"}')).toStrictEqual({
      name: 'toto',
    })
  })

  test('Parse a JSON string with multiple properties', () => {
    expect(
      parseJavaScriptObjectNotation('{"name":"toto","age":25}'),
    ).toStrictEqual({
      name: 'toto',
      age: 25,
    })
  })

  test('Parse a JSON array', () => {
    expect(parseJavaScriptObjectNotation('[1,2,3]')).toStrictEqual([1, 2, 3])
  })

  test('Stringify a simple object into a JSON string', () => {
    expect(
      stringifyJavaScriptObjectNotation({
        name: 'toto',
      }),
    ).toBe('{"name":"toto"}')
  })

  test('Stringify an object with multiple properties', () => {
    expect(stringifyJavaScriptObjectNotation({ name: 'toto', age: 25 })).toBe(
      '{"name":"toto","age":25}',
    )
  })

  test('Stringify and parse should be inverse operations (roundtrip)', () => {
    const original = { city: 'Lausanne', zip: 1000 }
    const json = stringifyJavaScriptObjectNotation(original)
    const parsed = parseJavaScriptObjectNotation(json)
    expect(parsed).toStrictEqual(original)
  })
})
