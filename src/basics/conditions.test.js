import { describe, expect, it, test } from 'vitest'
import { isBiggerThan2, isMult } from './conditions.js'

describe('Function is bigger than 2 :', () => {
  it('Should throw an error when called with a string instead of a number', () => {
    expect(() => isBiggerThan2('bonjour')).toThrowError()
  })

  it('Should throw an error when called with NaN', () => {
    expect(() => isBiggerThan2(Number.NaN)).toThrowError()
  })

  test('Numbers strictly greater than 2 should return true', () => {
    expect(isBiggerThan2(3)).toBe(true)
    expect(isBiggerThan2(4)).toBe(true)
    expect(isBiggerThan2(10)).toBe(true)
    expect(isBiggerThan2(55.43)).toBe(true)
    expect(isBiggerThan2(2.001)).toBe(true)
  })

  test('2 itself should return false (strictly greater, not greater or equal)', () => {
    expect(isBiggerThan2(2)).toBe(false)
  })

  test('Numbers less than 2 should return false', () => {
    expect(isBiggerThan2(0.1)).toBe(false)
    expect(isBiggerThan2(1.999)).toBe(false)
    expect(isBiggerThan2(0)).toBe(false)
  })

  test('Negative numbers should return false', () => {
    expect(isBiggerThan2(-5)).toBe(false)
    expect(isBiggerThan2(-1)).toBe(false)
  })
})

describe('Function is multiple of :', () => {
  it('Should throw an error when the first argument is a string', () => {
    expect(() => isMult('bonjour', 4)).toThrowError()
  })

  it('Should throw an error when the first argument is NaN', () => {
    expect(() => isMult(Number.NaN, 3)).toThrowError()
  })

  it('Should throw an error when the second argument is not a number', () => {
    expect(() => isMult(3, {})).toThrowError()
  })

  it('Should throw an error when the second argument is NaN', () => {
    expect(() => isMult(2, Number.NaN)).toThrowError()
  })

  test('A number divisible by another should return true', () => {
    expect(isMult(100, 10)).toBe(true)
    expect(isMult(49, 7)).toBe(true)
    expect(isMult(2618, 77)).toBe(true)
  })

  test('A number not divisible by another should return false', () => {
    expect(isMult(27, 8)).toBe(false)
    expect(isMult(84, 5)).toBe(false)
    expect(isMult(10, 3)).toBe(false)
  })

  test('Any number is a multiple of 1', () => {
    expect(isMult(7, 1)).toBe(true)
    expect(isMult(123, 1)).toBe(true)
  })

  test('A number is always a multiple of itself', () => {
    expect(isMult(5, 5)).toBe(true)
    expect(isMult(13, 13)).toBe(true)
  })

  test('0 is a multiple of any number (0 % n === 0)', () => {
    expect(isMult(0, 5)).toBe(true)
    expect(isMult(0, 1)).toBe(true)
  })
})
