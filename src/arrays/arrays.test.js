import { describe, expect, test } from 'vitest'
import {
  concatenateArrays,
  replaceElementsInArrayAtAGivenPlace,
  splitAllStringsByWordAndFilterEmptyOnes,
} from './arrays.js'

describe('Array of sentences :', () => {
  test('Should split sentences into individual words', () => {
    expect(
      splitAllStringsByWordAndFilterEmptyOnes([
        'Toto and tutu',
        'goes',
        '',
        'to the',
        'beach',
      ]),
    ).toStrictEqual(['Toto', 'and', 'tutu', 'goes', 'to', 'the', 'beach'])
  })

  test('Should filter out strings that contain only a space', () => {
    expect(
      splitAllStringsByWordAndFilterEmptyOnes([
        'Toto and tutu',
        'goes',
        ' ',
        'to the',
        'beach',
      ]),
    ).toStrictEqual(['Toto', 'and', 'tutu', 'goes', 'to', 'the', 'beach'])
  })

  test('An empty array should return an empty array', () => {
    expect(splitAllStringsByWordAndFilterEmptyOnes([])).toStrictEqual([])
  })

  test('An array of only empty strings should return an empty array', () => {
    expect(splitAllStringsByWordAndFilterEmptyOnes(['', '', ''])).toStrictEqual(
      [],
    )
  })

  test('Single-word strings should remain as-is (no splitting needed)', () => {
    expect(
      splitAllStringsByWordAndFilterEmptyOnes(['hello', 'world']),
    ).toStrictEqual(['hello', 'world'])
  })

  test('Should handle multiple consecutive spaces between words', () => {
    expect(
      splitAllStringsByWordAndFilterEmptyOnes(['hello  world']),
    ).toStrictEqual(['hello', 'world'])
  })
})

describe('Array concatenation :', () => {
  test('Should concatenate two arrays of numbers into one', () => {
    expect(concatenateArrays([2, 3, 4, 5], [3, 6, 8, 3, 5, 6])).toStrictEqual([
      2, 3, 4, 5, 3, 6, 8, 3, 5, 6,
    ])
  })

  test('Should concatenate two arrays of strings into one', () => {
    expect(
      concatenateArrays(['toto', 'tutu', 'tata'], ['titi', 'tsts']),
    ).toStrictEqual(['toto', 'tutu', 'tata', 'titi', 'tsts'])
  })

  test('Concatenating with an empty array should return the other array', () => {
    expect(concatenateArrays([], [1, 2, 3])).toStrictEqual([1, 2, 3])
    expect(concatenateArrays([1, 2, 3], [])).toStrictEqual([1, 2, 3])
  })

  test('Concatenating two empty arrays should return an empty array', () => {
    expect(concatenateArrays([], [])).toStrictEqual([])
  })

  test('Order matters: elements from the first array come before the second', () => {
    expect(concatenateArrays([1], [2])).toStrictEqual([1, 2])
    expect(concatenateArrays([2], [1])).toStrictEqual([2, 1])
  })
})

describe('Replace elements in array :', () => {
  test('Should replace one element at the given index', () => {
    const originalArray = [2, 3, 4, 5]
    expect(
      replaceElementsInArrayAtAGivenPlace(originalArray, 1, 10),
    ).toStrictEqual([2, 10, 4, 5])
    expect(originalArray).toStrictEqual([2, 3, 4, 5])
  })

  test('Should replace two consecutive elements starting at the given index', () => {
    const originalArray = [2, 3, 4, 5]
    expect(
      replaceElementsInArrayAtAGivenPlace(originalArray, 1, 10, 22),
    ).toStrictEqual([2, 10, 22, 5])
    expect(originalArray).toStrictEqual([2, 3, 4, 5])
  })

  test('Should replace four consecutive elements starting at the given index', () => {
    const originalArray = [2, 3, 4, 5, 2, 6, 9]
    expect(
      replaceElementsInArrayAtAGivenPlace(originalArray, 3, 1, 1, 1, 1),
    ).toStrictEqual([2, 3, 4, 1, 1, 1, 1])
    expect(originalArray).toStrictEqual([2, 3, 4, 5, 2, 6, 9])
  })

  test('Should be able to replace the first element (index 0)', () => {
    const originalArray = ['a', 'b', 'c']
    expect(
      replaceElementsInArrayAtAGivenPlace(originalArray, 0, 'x'),
    ).toStrictEqual(['x', 'b', 'c'])
    expect(originalArray).toStrictEqual(['a', 'b', 'c'])
  })

  test('Should be able to replace the last element', () => {
    const originalArray = ['a', 'b', 'c']
    expect(
      replaceElementsInArrayAtAGivenPlace(originalArray, 2, 'x'),
    ).toStrictEqual(['a', 'b', 'x'])
    expect(originalArray).toStrictEqual(['a', 'b', 'c'])
  })

  test('Must not modify the original array (immutability)', () => {
    const originalArray = [1, 2, 3, 4, 5]
    const result = replaceElementsInArrayAtAGivenPlace(originalArray, 0, 99)
    expect(result).toStrictEqual([99, 2, 3, 4, 5])
    expect(originalArray).toStrictEqual([1, 2, 3, 4, 5])
    expect(result).not.toBe(originalArray)
  })
})
