import { describe, expect, it, test } from 'vitest'
import { findAndReplacePreservingCase } from './strings.js'

describe('Find and replace :', () => {
  it('Should throw an error when the first argument is not a string', () => {
    expect(() =>
      findAndReplacePreservingCase(2, 'hello', 'world'),
    ).toThrowError()
  })

  it('Should throw an error when the first argument is NaN', () => {
    expect(() =>
      findAndReplacePreservingCase(Number.NaN, '', ''),
    ).toThrowError()
  })

  it('Should throw an error when the third argument is not a string', () => {
    expect(() => findAndReplacePreservingCase('', '', {})).toThrowError()
  })

  test('Should preserve uppercase letters at the same positions', () => {
    expect(
      findAndReplacePreservingCase('toto', 'Toto is a good programmer', 'titi'),
    ).toBe('Titi is a good programmer')
  })

  test('Should replace all occurrences, not just the first one', () => {
    expect(
      findAndReplacePreservingCase(
        'tutu',
        'Tutu toto titi tutu tata TuTU',
        'tata',
      ),
    ).toBe('Tata toto titi tata tata TaTA')
  })

  test('Should preserve mixed case patterns from the original text', () => {
    expect(
      findAndReplacePreservingCase('Tata', 'Programming with taTA', 'toto'),
    ).toBe('Programming with toTO')
  })

  test('When the new word is longer, extra characters should be ignored', () => {
    expect(
      findAndReplacePreservingCase(
        'toto',
        'Toto is a good programmer',
        'anonymous',
      ),
    ).toBe('Anon is a good programmer')
  })

  test('When the new word is shorter, the replacement should be shorter too', () => {
    expect(
      findAndReplacePreservingCase('toto', 'Toto is a good programmer', 'Ta'),
    ).toBe('Ta is a good programmer')
  })

  test('Should return the haystack unchanged when the needle is not found', () => {
    expect(
      findAndReplacePreservingCase('xyz', 'Toto is a good programmer', 'abc'),
    ).toBe('Toto is a good programmer')
  })

  test('Should handle all-uppercase text', () => {
    expect(findAndReplacePreservingCase('toto', 'TOTO IS HERE', 'titi')).toBe(
      'TITI IS HERE',
    )
  })

  test('Should handle all-lowercase text', () => {
    expect(findAndReplacePreservingCase('toto', 'toto is here', 'titi')).toBe(
      'titi is here',
    )
  })
})
