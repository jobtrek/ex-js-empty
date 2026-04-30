import { describe, expect, it, test } from 'vitest'
import { factorial, fibonacci } from './recursion.js'

describe('Factorial function:', () => {
  it('Should throw an error when called with a string', () => {
    expect(() => factorial('hello')).toThrowError()
  })

  it('Should throw an error when called with NaN', () => {
    expect(() => factorial(Number.NaN)).toThrowError()
  })

  it('Should throw an error when called with a negative number', () => {
    expect(() => factorial(-5)).toThrowError()
    expect(() => factorial(-1)).toThrowError()
  })

  it('Should throw an error when called with a decimal number (must be an integer)', () => {
    expect(() => factorial(3.5)).toThrowError()
  })

  it('Should throw an error when called with null', () => {
    expect(() => factorial(null)).toThrowError()
  })

  it('Should throw an error when called with undefined', () => {
    expect(() => factorial(undefined)).toThrowError()
  })

  test('Base case: factorial(0) should be 1', () => {
    expect(factorial(0)).toBe(1)
  })

  test('Base case: factorial(1) should be 1', () => {
    expect(factorial(1)).toBe(1)
  })

  test('factorial(2) = 2 x 1 = 2', () => {
    expect(factorial(2)).toBe(2)
  })

  test('factorial(3) = 3 x 2 x 1 = 6', () => {
    expect(factorial(3)).toBe(6)
  })

  test('Calculate factorial for small values', () => {
    expect(factorial(4)).toBe(24)
    expect(factorial(5)).toBe(120)
    expect(factorial(6)).toBe(720)
    expect(factorial(7)).toBe(5040)
  })

  test('Calculate factorial for larger values', () => {
    expect(factorial(8)).toBe(40320)
    expect(factorial(9)).toBe(362880)
    expect(factorial(10)).toBe(3628800)
  })
})

describe('Fibonacci function:', () => {
  it('Should throw an error when called with a string', () => {
    expect(() => fibonacci('hello')).toThrowError()
  })

  it('Should throw an error when called with NaN', () => {
    expect(() => fibonacci(Number.NaN)).toThrowError()
  })

  it('Should throw an error when called with a negative number', () => {
    expect(() => fibonacci(-1)).toThrowError()
    expect(() => fibonacci(-10)).toThrowError()
  })

  it('Should throw an error when called with a decimal number (must be an integer)', () => {
    expect(() => fibonacci(2.5)).toThrowError()
  })

  it('Should throw an error when called with null', () => {
    expect(() => fibonacci(null)).toThrowError()
  })

  it('Should throw an error when called with undefined', () => {
    expect(() => fibonacci(undefined)).toThrowError()
  })

  test('Base case: fibonacci(0) should be 0', () => {
    expect(fibonacci(0)).toBe(0)
  })

  test('Base case: fibonacci(1) should be 1', () => {
    expect(fibonacci(1)).toBe(1)
  })

  test('fibonacci(2) = fibonacci(1) + fibonacci(0) = 1', () => {
    expect(fibonacci(2)).toBe(1)
  })

  test('fibonacci(3) = fibonacci(2) + fibonacci(1) = 2', () => {
    expect(fibonacci(3)).toBe(2)
  })

  test('Calculate Fibonacci for small values (sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21)', () => {
    expect(fibonacci(4)).toBe(3)
    expect(fibonacci(5)).toBe(5)
    expect(fibonacci(6)).toBe(8)
    expect(fibonacci(7)).toBe(13)
    expect(fibonacci(8)).toBe(21)
  })

  test('Calculate Fibonacci for larger values', () => {
    expect(fibonacci(9)).toBe(34)
    expect(fibonacci(10)).toBe(55)
    expect(fibonacci(11)).toBe(89)
    expect(fibonacci(12)).toBe(144)
    expect(fibonacci(15)).toBe(610)
  })
})
